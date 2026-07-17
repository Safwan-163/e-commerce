from django.shortcuts import render
from products.models import Product
from users.models import Customer
from cart.models import Cart, CartItem
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response    
from rest_framework import status
from orders.models import Order, OrderItem


# Create your views here.

def get_customer_from_request(user):
    try:
        return Customer.objects.get(user=user)
    except Customer.DoesNotExist:
        return None


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    customer = get_customer_from_request(request.user)

    if customer is None:
        return Response(
            {"error": "Only customers can add items to cart"},
            status=status.HTTP_403_FORBIDDEN
        )

    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    if quantity <= 0:
        return Response(
            {"error": "Quantity must be greater than zero"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        product = Product.objects.get(id=product_id)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    cart, created = Cart.objects.get_or_create(
        customer=customer
    )

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={
            "quantity": quantity,
            "price": product.product_cost
        }
    )

    if not created:
        cart_item.quantity += quantity

    cart_item.price = product.product_cost
    cart_item.save()

    return Response(
        {
            "message": "Product added successfully",
            "quantity": cart_item.quantity
        },
        status=status.HTTP_200_OK
    )
    
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):

    # 🔒 Get customer
    customer = get_customer_from_request(request.user)
    if not customer:
        return Response({"error": "Only customers allowed"}, status=403)

    # 🛒 Get cart
    try:
        cart = Cart.objects.get(customer=customer)
    except Cart.DoesNotExist:
        return Response({
            "message": "Cart is empty",
            "items": [],
            "total_items": 0,
            "total_price": 0
        })

    # 📦 Get items
    # cart_items = CartItem.objects.filter(cart=cart)

    # items_data = []
    # total_items = 0
    # total_price = 0

    # for item in cart_items:
        
    #      item_total = item.product.product_cost * item.quantity

    #      items_data.append({
    #     "cart_item_id": item.id,
    #     "product_id": item.product.id,
    #     "product_name": item.product.product_name,
    #     "price": item.product.product_cost,
    #     "image": request.build_absolute_uri(item.product.product_image.url)
    #              if item.product.product_image else None,
    #     "quantity": item.quantity,
    #     "total_price": item_total,
    # })

    # total_items += item.quantity
    # total_price += item_total
    cart_items = CartItem.objects.filter(cart=cart)

    items_data = []
    total_items = 0
    total_price = 0

    for item in cart_items:
        
        
       item_total = item.product.product_cost * item.quantity

       items_data.append({
        "cart_item_id": item.id,
        "product_id": item.product.id,
        "product_name": item.product.product_name,
        "price": item.product.product_cost,
        "image": request.build_absolute_uri(item.product.product_image.url)
                 if item.product.product_image else None,
        "quantity": item.quantity,
        "total_price": item_total,
    })

       total_items += item.quantity
       total_price += item_total

    return Response({
    "customer_id": customer.id,
    "items": items_data,
    "total_items": total_items,
    "total_price": total_price,
})
    # return Response({
    #     "customer_id": customer.id,
    #     "items": items_data,
    #     "total_items": total_items,
    #     "total_price": total_price
    # })
    
    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):

    # cart_item_id = request.data.get('cart_item_id')
    print(request.data)

    cart_item_id = request.data.get("cart_item_id")
    print("cart_item_id =", cart_item_id)

    # ❗ Validate input
    if not cart_item_id:
        return Response(
            {"error": "cart_item_id is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔒 Get customer
    customer = get_customer_from_request(request.user)
    if not customer:
        return Response({"error": "Only customers allowed"}, status=403)

    try:
        cart_item = CartItem.objects.get(id=cart_item_id)

        # 🔒 Ownership check (VERY IMPORTANT)
        if cart_item.cart.customer != customer:
            return Response(
                {"error": "You can only remove your own cart items"},
                status=status.HTTP_403_FORBIDDEN
            )

        cart_item.delete()

        return Response({"message": "Item removed from cart"})

    except CartItem.DoesNotExist:
        return Response(
            {"error": "Item not found"},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
def get_details(request):
    product_id = request.query_params.get('product_id')

    if not product_id:
        return Response({"error": "product_id is required"}, status=400)

    try:
        product = Product.objects.get(pk=product_id) # type: ignore
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    data = {
        "product_id": product.id,
        "name": product.name,
        "price": product.price,
        "description": product.description,   # make sure field exists
        "stock": product.stock                # optional (if you have it)
    }

    return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):

    customer = get_customer_from_request(request.user)

    if customer is None:
        return Response(
            {"error": "Only customers allowed"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        cart = Cart.objects.get(customer=customer)

    except Cart.DoesNotExist:
        return Response(
            {"message": "Cart is already empty"},
            status=status.HTTP_200_OK
        )

    CartItem.objects.filter(cart=cart).delete()

    return Response(
        {"message": "Cart cleared successfully"},
        status=status.HTTP_200_OK
    )
        
#this functtion is to buy all the items in the cart and create an order for them. It will also check if the stock is available for each item and reduce the stock accordingly. If any item is out of stock, it will return an error message.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):

    customer = get_customer_from_request(request.user)
    if not customer:
        return Response({"error": "Only customers allowed"}, status=403)

    try:
        cart = Cart.objects.get(user=customer)
    except Cart.DoesNotExist:
        return Response({"error": "Cart is empty"}, status=400)

    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total = 0

    order = Order.objects.create(
        customer=customer,
        status="Pending"
    )

    for item in cart_items:

        if item.product.stock < item.quantity:
            return Response({
                "error": f"{item.product.name} is out of stock."
            }, status=400)

        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

        total += item.product.price * item.quantity

        item.product.stock -= item.quantity
        item.product.save()

    order.total_cost = total
    order.save()

    cart_items.delete()

    return Response({
        "message": "Order placed successfully",
        "order_id": order.id,
        "total": total
    })
    
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_now(request):

    customer = get_customer_from_request(request.user)
    if not customer:
        return Response({"error": "Only customers allowed"}, status=403)

    product_id = request.data.get("product_id")
    quantity = int(request.data.get("quantity", 1))

    if quantity <= 0:
        return Response({"error": "Invalid quantity"}, status=400)

    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    if product.stock < quantity:
        return Response(
            {"error": "Insufficient stock"},
            status=400
        )

    total = product.price * quantity

    order = Order.objects.create(
        customer=customer,
        total_cost=total,
        status="Pending"
    )

    OrderItem.objects.create(
        order=order,
        product=product,
        quantity=quantity,
        price=product.price
    )

    product.stock -= quantity
    product.save()

    return Response({
        "message": "Order placed successfully",
        "order_id": order.id,
        "total": total
    })