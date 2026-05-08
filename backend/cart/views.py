from django.shortcuts import render
from products.models import Product
from users.models import Customer
from cart.models import Cart, CartItem
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


# Create your views here.
@api_view(['POST'])
def add_to_cart(request):
    # Logic to add product to cart
    customer_id = request.data.get('customer_id')
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    
    # Validate customer
    try:
        customer = Customer.objects.get(pk=customer_id)
    except Customer.DoesNotExist:
        return Response({"error": "Customer not found"}, status=404)

    # Validate product
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    # Get or create cart
    cart, _ = Cart.objects.get_or_create(customer=customer)

    # Check if item already exists
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if created:
        cart_item.quantity = quantity
    else:
        cart_item.quantity += int(quantity)

    cart_item.save()

    return Response({
        "message": "Added to cart",
        "product": product_id,
        "quantity": cart_item.quantity
    })
    
@api_view(['GET'])
def view_cart(request):
    customer_id = request.query_params.get('customer_id')

    # Validate customer
    try:
        customer = Customer.objects.get(pk=customer_id)
    except Customer.DoesNotExist:
        return Response({"error": "Customer not found"}, status=404)

    # Check if cart exists
    try:
        cart = Cart.objects.get(customer=customer)
    except Cart.DoesNotExist:
        return Response({
            "message": "Cart is empty",
            "items": [],
            "total_items": 0
        })

    # Get cart items
    cart_items = CartItem.objects.filter(cart=cart)

    items_data = []
    total_items = 0

    for item in cart_items:
        items_data.append({
            "cart_item_id": item.cart_item_id,
            "product_id": item.product.id,
            "product_name": item.product.name,   # make sure field name matches your Product model
            "price": item.product.price,
            "quantity": item.quantity,
            "total_price": item.product.price * item.quantity
        })
        total_items += item.quantity

    return Response({
        "customer_id": customer_id,
        "items": items_data,
        "total_items": total_items
    })
@api_view(['DELETE'])
def remove_from_cart(request):
    cart_item_id = request.data.get('cart_item_id')

    if not cart_item_id:
        return Response({"error": "cart_item_id is required"}, status=400)

    try:
        cart_item = CartItem.objects.get(pk=cart_item_id)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

    cart_item.delete()

    return Response({
        "message": "Item removed from cart"
    })

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
def clear_cart(request):
    user_id = request.data.get('user_id')

    try:
        cart = Cart.objects.get(customer_id=user_id)

        # Delete all items in cart
        CartItem.objects.filter(cart=cart).delete()

        return Response({"message": "Cart cleared successfully"})
    
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)