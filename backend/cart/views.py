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


# Create your views here.

def get_customer_from_request(user):
    try:
        return Customer.objects.get(id=user.id)
    except Customer.DoesNotExist:
        return None


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    # 🔒 Get customer
    customer = get_customer_from_request(request.user)
    if not customer:
        return Response({"error": "Only customers allowed"}, status=403)

    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    # ❗ Validate input
    if not product_id:
        return Response({"error": "product_id required"}, status=400)

    try:
        quantity = int(quantity)
        if quantity <= 0:
            return Response({"error": "Invalid quantity"}, status=400)
    except:
        return Response({"error": "Quantity must be number"}, status=400)

    # 🔍 Validate product
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    # 🛒 Get or create cart
    cart, _ = Cart.objects.get_or_create(customer=customer)

    # 📦 Add item
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if created:
        cart_item.quantity = quantity
    else:
        cart_item.quantity += quantity

    cart_item.save()

    return Response({
        "message": "Added to cart",
        "product": product.id,
        "quantity": cart_item.quantity
    })
    
    
    
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
    cart_items = CartItem.objects.filter(cart=cart)

    items_data = []
    total_items = 0
    total_price = 0

    for item in cart_items:
        item_total = item.product.price * item.quantity

        items_data.append({
            "cart_item_id": item.id,
            "product_id": item.product.id,
            "product_name": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity,
            "total_price": item_total
        })

        total_items += item.quantity
        total_price += item_total

    return Response({
        "customer_id": customer.id,
        "items": items_data,
        "total_items": total_items,
        "total_price": total_price
    })
    
    
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):

    cart_item_id = request.data.get('cart_item_id')

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

    # 🔒 Get customer
    customer = get_customer_from_request(request.user)
    if not customer:
        return Response(
            {"error": "Only customers allowed"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        cart = Cart.objects.get(customer=customer)

        # 🧹 Clear all items
        CartItem.objects.filter(cart=cart).delete()

        return Response({"message": "Cart cleared successfully"})

    except Cart.DoesNotExist:
        return Response(
            {"message": "Cart is already empty"},
            status=status.HTTP_200_OK
        )