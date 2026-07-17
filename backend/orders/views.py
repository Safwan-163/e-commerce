from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from cart.models import Cart, CartItem
from users.models import Customer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from . models import Order, Shipping, OrderItem
from . serializers import OrderSerializer, ShippingSerializer, OrderItemSerializer
from  users.models import Employee

# Create your views here.
def get_customer_from_request(user):
    try:
        return Customer.objects.get(id=user.id)
    except Customer.DoesNotExist:
        return None


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    try:
        customer = get_customer_from_request(request.user)
    except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
    
    cart_items = CartItem.objects.filter(customer=customer)
    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    order = Order.objects.create(customer=customer, status="Pending")
    
    total=0
    for item in cart_items:
        product = item.product
        quantity = item.quantity
        price = product.price * quantity
       
        total += price
        OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price) # type: ignore

    order.total_amount = total
    order.save()
    
    cart_items.delete()
    
    return Response({
        "message": "Order placed successfully",
        "order_id": order.id
    })

            


@api_view(['GET'])
def view_orders(request):
    customer = request.user.customer
    orders = Order.objects.filter(customer=customer)

    data = []
    for order in orders:
        data.append({
            "id": order.id,
            "status": order.status,
            "total": order.total_amount
        })

    return Response(data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request):

    order_id = request.data.get("order_id")
    new_status = request.data.get("status")

    # ❗ Validate input
    if not order_id or not new_status:
        return Response(
            {"error": "order_id and status required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔒 Check employee
    if not Employee.objects.filter(id=request.user.id).exists():
        return Response(
            {"error": "Only employees can update order status"},
            status=status.HTTP_403_FORBIDDEN
        )

    # ✅ Optional: restrict valid statuses
    VALID_STATUS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

    if new_status not in VALID_STATUS:
        return Response(
            {"error": "Invalid status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        order = Order.objects.get(id=order_id)
        order.status = new_status
        order.save()

        return Response({"message": "Order status updated"})

    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    
    
@api_view(['POST'])
def cancel_order(request):
    order_id = request.data.get("order_id")
    
    if not order_id:
        return Response({"error": "order_id required"}, status=400)
    

    try:
        order = Order.objects.get(id=order_id)
        customer=Customer.objects.get(id=request.user.id)
        
        if order.customer != customer:
            return Response({"error": "You can only cancel your own orders"}, status=403)
         
        if order.status in ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"]:
            return Response({"message": f"Cannot cancel order in {order.status} status"}, status=400)
        
        order.status = "CANCELLED"
        order.save()
   
        return Response({"message": "Order cancelled"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_details(request):

    order_id = request.query_params.get("order_id")

    # ❗ Validate input
    if not order_id:
        return Response(
            {"error": "order_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        order = Order.objects.get(id=order_id)

        # 🔒 Ownership check
        customer = Customer.objects.get(id=request.user.id)

        if order.customer_id != customer:
            return Response(
                {"error": "You can only view your own orders"},
                status=status.HTTP_403_FORBIDDEN
            )

        # 📦 Get items
        items = OrderItem.objects.filter(order=order)

        item_list = [
            {
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.price
            }
            for item in items
        ]

        return Response({
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "items": item_list
        })

    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    
@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.all()

    data = [
        {
            "id": o.id,
            "customer": o.customer.id,
            "status": o.status,
            "total": o.total_amount
        }
        for o in orders
    ]

    return Response(data)


@api_view(['GET'])
def order_history(request):
    customer = request.user.customer
    orders = Order.objects.filter(customer=customer, status="Delivered")

    return Response([
        {
            "id": o.id,
            "total": o.total_amount,
            "date": o.created_at
        }
        for o in orders
    ])
    
    
@api_view(['GET'])
def track_order(request):
    order_id = request.query_params.get("order_id")

    try:
        order = Order.objects.get(id=order_id)

        return Response({
            "order_id": order.id,
            "status": order.status
        })
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['POST'])
def return_order(request):
    order_id = request.data.get("order_id")

    try:
        order = Order.objects.get(id=order_id)

        if order.status != "Delivered":
            return Response({"message": "Only delivered orders can be returned"}, status=400)

        order.status = "Returned"
        order.save()

        return Response({"message": "Order returned successfully"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['GET'])
def generate_invoice(request):
    order_id = request.query_params.get("order_id")

    try:
        order = Order.objects.get(id=order_id)
        items = OrderItem.objects.filter(order=order) # type: ignore

        invoice = {
            "order_id": order.id,
            "customer": order.customer.id,
            "total": order.total_amount,
            "items": [
                {
                    "product": i.product.name,
                    "qty": i.quantity,
                    "price": i.price
                } for i in items
            ]
        }

        return Response(invoice)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['POST'])
def apply_discount(request):
    order_id = request.data.get("order_id")
    code = request.data.get("code")

    try:
        order = Order.objects.get(id=order_id)

        if code == "SAVE10":
            discount = order.total_amount * 0.10
            order.total_amount -= discount
            order.save()

            return Response({"message": "Discount applied", "new_total": order.total_amount})

        return Response({"message": "Invalid coupon"}, status=400)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['GET'])
def get_order_history(request):
    user_id = request.query_params.get('user_id')

    if not user_id:
        return Response({"error": "User ID required"}, status=status.HTTP_400_BAD_REQUEST)

    # Example:
    # orders = Order.objects.filter(customer_id=user_id)

    return Response({
        "user_id": user_id,
        "orders": []  # return serialized data later
    })