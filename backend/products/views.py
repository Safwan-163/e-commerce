import json
import traceback
from urllib import request

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

#def is_employee(user):
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

        serializer_1 = ProductSerializer(product)
        serializer_2 = ProductDetailSerializer(product.details.all(), many=True)
        

        return Response(
            {
                "product": serializer_1.data,
                "details": serializer_2.data
            },
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
        traceback.print_exc()
        print(request.data)
        return Response({"error": str(e)}, status=400)
    
    



from django.shortcuts import get_object_or_404

@api_view(['DELETE'])
@permission_classes([IsEmployee])
def remove_product(request,product_code):

    

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
def update_product(request, product_code):

    try:
        product = Product.objects.get(product_code=product_code)
        data = request.data

        # ---- safe field updates ----
        if "name" in data:
            product.product_name = data["name"]

        if "cost" in data:
            product.product_cost = data["cost"]

        if "description" in data:
            product.product_description = data["description"]

        if "image" in request.FILES:
          product.product_image = request.FILES["image"]

        # ---- type safely ----
        type_raw = data.get("type")
        if type_raw:
            type_map = {
                "electronics": "01",
                "clothing": "02",
                "home_appliances": "03",
                "books": "04",
                "toys": "05",
                "beauty": "06",
                "sports": "08",
                "stationary": "09",
            }

            type_input = type_raw.strip().lower()

            if type_input not in type_map:
                return Response(
                    {"error": "Invalid product type"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            product.product_type = type_map[type_input]

        # product.save()

        # ---- details safely ----
        details = data.get("details")

        if isinstance(details, list):
            ProductDetail.objects.filter(product=product).delete()

            for d in details:
                if d.get("key") and d.get("value"):
                    ProductDetail.objects.create(
                        product=product,
                        key=d["key"],
                        value=d["value"]
                    )

        return Response({"message": "Product updated successfully"})

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    except Exception as e:
        traceback.print_exc()
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
        
@api_view(['GET'])
@permission_classes([IsEmployee])
def product_to_update(request, product_code):
    try:
        product = Product.objects.get(product_code=product_code)

        type_reverse = {
            "01": "electronics",
            "02": "clothing",
            "03": "home_appliances",
            "04": "books",
            "05": "toys",
            "06": "beauty",
            "08": "sports",
            "09": "stationary",
        }

        return Response({
            "product_code": product.product_code,
            "name": product.product_name,
            "cost": str(product.product_cost),
            "description": product.product_description,

            # FIXED
            "type": type_reverse.get(
                product.product_type,
                ""
            ),

            "image": (
                request.build_absolute_uri(
                    product.product_image.url
                )
                if product.product_image
                else ""
            ),

            "details": [
                {
                    "id": d.id,
                    "key": d.key,
                    "value": d.value
                }
                for d in product.details.all()
            ]
        })

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=404
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



@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_stock(request, pk):
    product = Product.objects.get(pk=pk)

    product.stock_status = request.data.get(
        "stock_status",
        product.stock_status,
    )

    product.save()

    return Response({
        "message": "Stock updated"
    })
        