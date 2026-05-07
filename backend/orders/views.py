from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from backend.cart.models import Cart, CartItem
from backend.users.models import Customer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.
@api_view(['POST'])
def place_order(request):
    customer = request.user.customer
    cart_items = Cart.objects.filter(customer=customer)

    if not cart_items.exists():
        return Response({"message": "Cart is empty"}, status=400)

    order = Order.objects.create(customer=customer, status="Pending")

    total = 0

    for item in cart_items:
        product = item.product
        quantity = item.quantity
        price = product.price * quantity
        total += price

        OrderItem.objects.create( # type: ignore
            order=order,
            product=product,
            quantity=quantity,
            price=price
        )

    order.total_amount = total
    order.save()

    cart_items.delete()

    return Response({"message": "Order placed successfully", "order_id": order.id})


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
def update_order_status(request):
    order_id = request.data.get("order_id")
    status = request.data.get("status")

    try:
        order = Order.objects.get(id=order_id)
        order.status = status
        order.save()
        return Response({"message": "Order status updated"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['POST'])
def cancel_order(request):
    order_id = request.data.get("order_id")

    try:
        order = Order.objects.get(id=order_id)

        if order.status == "Shipped":
            return Response({"message": "Cannot cancel shipped order"}, status=400)

        order.status = "Cancelled"
        order.save()

        return Response({"message": "Order cancelled"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
@api_view(['GET'])
def order_details(request):
    order_id = request.query_params.get("order_id")

    try:
        order = Order.objects.get(id=order_id)
        items = OrderItem.objects.filter(order=order) # type: ignore

        item_list = []
        for item in items:
            item_list.append({
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.price
            })

        return Response({
            "order_id": order.id,
            "status": order.status,
            "total": order.total_amount,
            "items": item_list
        })
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    
    
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