import json

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
from .models import ProductDetail
from django.db import transaction, IntegrityError


class IsEmployee(BasePermission):
    def has_permission(self, request, view):

        print("Authenticated:", request.user.is_authenticated)
        print("User:", request.user)

        if not request.user.is_authenticated:
            return False

        print("Role:", request.user.role)

        return request.user.role == User.Role.EMPLOYEE
# class IsCustomer(BasePermission):
#     def has_permission(self, request, view):
#         return super().has_permission(request, view)

# def is_employee(user):
#     return Employee.objects.filter(id=user.user_code).exists()

@api_view(['GET'])
def view_product(request,product_code):
    try:
        #product_code = request.query_params.get("product_code")

        if not product_code:
            return Response(
                {"error": "product_code required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        product = Product.objects.get(product_code=product_code)

        serializer = ProductSerializer(product)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
        
        
@api_view(['GET'])
def view_all_product(request):
    try:
        products = Product.objects.all()

        serializer = ProductSerializer(
            products,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

  
@api_view(['POST'])
@permission_classes([IsEmployee])
def add_product(request):
    # try:
    #     serializer = ProductSerializer(data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)

    #     return Response(serializer.errors, status=400)
    # except Exception as e:
    #     return Response({"error": str(e)}, status=400)
    
    try:
        data = request.data
        type_input = data["type"].strip().lower()
        if type_input =='electronics':
            product_type = "01"
        elif type_input == 'clothing':
            product_type = "02"
        elif type_input == 'home_appliances':
            product_type = "03"
        elif type_input == 'books':
            product_type = "04"
        elif type_input == 'toys':
            product_type = "05"
        elif type_input == 'beauty':
            product_type = "06"
        elif type_input == 'sports':
            product_type = "08"
        elif type_input == 'stationary':
            product_type = "09"
        else:
            return Response({"error": "Invalid product type"}, status=400)
        
        product = Product(
            product_type=product_type,
            product_name=data["name"],
            product_cost=data["cost"],
            product_description=data["description"],
            product_image=data["image"]
            
        )
        product.save()
        details = json.loads(data.get("details", "[]"))

        for detail in details:
            ProductDetail.objects.create(
                product=product,
                key=detail["key"],
                value=detail["value"]
            )

        return Response(
            {"message": "Product created"},
            status=201
        )
        
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
    



from django.shortcuts import get_object_or_404

@api_view(['DELETE'])
@permission_classes([IsEmployee])
def remove_product(request):

    product_code = request.data.get('product_code')

    if not product_code:
        return Response(
            {"error": "product_code is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(Product, product_code=product_code)

    product.delete()

    return Response(
        {"message": "Product removed successfully"},
        status=status.HTTP_200_OK
    )
    
@api_view(['PUT'])
@permission_classes([IsEmployee])
def update_product(request):
    try:
        data = request.data
        product_code = data.get("product_code")

        if not product_code:
            return Response(
                {"error": "product_code required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(product_code=product_code)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Update type if provided
        if "type" in data:
            type_input = data["type"].strip().lower()

            if type_input == 'electronics':
                product.product_type = "01"
            elif type_input == 'clothing':
                product.product_type = "02"
            elif type_input == 'home_appliances':
                product.product_type = "03"
            elif type_input == 'books':
                product.product_type = "04"
            elif type_input == 'toys':
                product.product_type = "05"
            elif type_input == 'beauty':
                product.product_type = "06"
            elif type_input == 'sports':
                product.product_type = "08"
            elif type_input == 'stationary':
                product.product_type = "09"
            else:
                return Response(
                    {"error": "Invalid product type"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Update other fields if provided
        if "name" in data:
            product.product_name = data["name"]

        if "cost" in data:
            product.product_cost = data["cost"]

        if "description" in data:
            product.product_description = data["description"]

        if "image" in data:
            product.product_image = data["image"]

        product.save()

        # Update product details if provided
        if "details" in data:
            ProductDetail.objects.filter(product=product).delete()

            for detail in data["details"]:
                ProductDetail.objects.create(
                    product=product,
                    key=detail["key"],
                    value=detail["value"]
                )

        return Response(
            {"message": "Product updated successfully"},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )



# @api_view(['GET'])
# def list_products(request):
#     # Logic to list all products
#     products = Product.objects.all()
#     data = []
#     for product in products:
#         data.append({
#             "product_code": product.product_code,
#             "name": product.product_name,
#             "price": product.price,
#             "description": product.description,
#             "stock": product.stock
#         })
#     return Response(data)



@api_view(['GET'])
def product_analytics(request):
    data = (
        OrderItem.objects
        .values('product__product_code', 'product__product_name')
        .annotate(
            total_quantity=Sum('quantity'),
            total_customers=Count('order__user', distinct=True)
        )
    )

    formatted = [
        {
            "product_code": item["product__product_code"],
            "product_name": item["product__product_name"],
            "total_quantity": item["total_quantity"],
            "total_customers": item["total_customers"],
        }
        for item in data
    ]

    return Response(formatted)




        