from django.shortcuts import render
from users.models import Customer, Employee
from cart.models import Cart, CartItem
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


def is_employee(user_id):
    return Employee.objects.filter(Employee_id=user_id).exists()


@api_view(['GET'])
def get_details(request):
    user_id = request.query_params.get('user_id')

    if not is_employee(user_id):
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

    products = Product.objects.all()
    data = [{"id": p.id, "name": p.name, "price": p.price} for p in products]

    return Response(data)



@api_view(['POST'])
def add_product(request):
    user_id = request.data.get('user_id')

    if not is_employee(user_id):
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

    name = request.data.get('name')
    price = request.data.get('price')

    product = Product.objects.create(name=name, price=price)

    return Response({"message": "Product added", "id": product.id})


@api_view(['DELETE'])
def remove_product(request):
    user_id = request.data.get('user_id')
    product_id = request.data.get('product_id')

    if not is_employee(user_id):
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

    try:
        product = Product.objects.get(id=product_id)
        product.delete()
        return Response({"message": "Product removed"})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_product_details(request):
    user_id = request.data.get('user_id')
    product_id = request.data.get('product_id')

    if not is_employee(user_id):
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)

    try:
        product = Product.objects.get(id=product_id)

        product.name = request.data.get('name', product.name)
        product.price = request.data.get('price', product.price)
        product.save()

        return Response({"message": "Product updated"})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def list_products(request):
    # Logic to list all products
    products = Product.objects.all()
    data = []
    for product in products:
        data.append({
            "product_id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "stock": product.stock
        })
    return Response(data)
