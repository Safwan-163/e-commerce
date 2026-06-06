from django.shortcuts import render
from users.models import Customer, Employee, User
from cart.models import Cart, CartItem
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,BasePermission
from rest_framework.decorators import permission_classes
from products.models import Product
from orders.models import OrderItem
from django.db.models import Count, Sum


class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == User.Role.EMPLOYEE
        )

# def is_employee(user):
#     return Employee.objects.filter(id=user.user_code).exists()

@api_view(['GET'])
@permission_classes([IsEmployee])
def get_details(request):
    user_id = request.query_params.get('user_id')
    
    if not user_id:
        return Response({"error": "User ID required"}, status=status.HTTP_400_BAD_REQUEST)
    

    try:
        user_id = int(user_id)
    except ValueError:
        return Response({"error": "Invalid User ID"}, status=status.HTTP_400_BAD_REQUEST)
    if not is_employee(user_id):
        return Response({"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN)
    Products = Product.objects.all()
    serializer = ProductSerializer(Products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsEmployee])
def add_product(request):
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)




@api_view(['DELETE'])
@permission_classes([IsEmployee])
def remove_product(request):

    product_id = request.data.get('product_id')

    # ❗ Validate product_id
    if not product_id:
        return Response(
            {"error": "product_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔒 Check employee
    if not is_employee(request.user):
        return Response(
            {"error": "Only employees can delete products"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        product = Product.objects.get(id=product_id)
        product.delete()

        return Response({"message": "Product removed"})

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['PUT'])
@permission_classes([IsEmployee])
def update_product_details(request):

    product_id = request.data.get('product_id')

    # ❗ Validate product_id
    if not product_id:
        return Response(
            {"error": "product_id required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 🔒 Check employee
    if not is_employee(request.user):
        return Response(
            {"error": "Only employees can update products"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        product = Product.objects.get(id=product_id)

        # ✏️ Update fields
        product.name = request.data.get('name', product.name)
        product.price = request.data.get('price', product.price)
        product.save()

        return Response({"message": "Product updated"})

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )



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



@api_view(['GET'])
def product_analytics(request):
    data = (
        OrderItem.objects
        .values('product__id', 'product__name')
        .annotate(
            total_quantity=Sum('quantity'),
            total_customers=Count('order__user', distinct=True)
        )
    )

    formatted = [
        {
            "id": item["product__id"],
            "name": item["product__name"],
            "total_quantity": item["total_quantity"],
            "total_customers": item["total_customers"],
        }
        for item in data
    ]

    return Response(formatted)

