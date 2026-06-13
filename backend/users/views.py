from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

# Create your views here.
# @api_view(['POST'])
# def register_customer(request):
#     data = request.data

#     user = User.objects.create_user(
#     username=data['username'],
#     email=data['email'],
#     password=data['password'],
   
# )
#     user.role = "02"
#     user.save()
    

#     Customer.objects.create(
#         user=user,
#         phone=data['phone'],
#         address=data['address']
#     )

#     return Response({
#         "message": "Customer created",
#         "user_code": user.user_code
#     })

# @api_view(['POST'])
# def register_employee(request):
  
        
#     data=request.data
#     user = User.objects.create_user(
#     username=data['username'],
#     email=data['email'],
#     password=data['password']
#      )
#     user.role="01"
#     user.save()
#     Employee.objects.create(
#         user=user,
#         phone=data['phone'],
#         address=data['address']
#     )
#     return Response({
#         "message": "Employee created",
#         "user_code": user.user_code
#     })
    
    
    
#register method for both customer and employee.
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):

    try:

        data = request.data

        role_input = data['role'].strip().lower()

        if role_input == "customer":
            role = "02"

        elif role_input == "employee":
            role = "01"

        else:
            return Response(
                {"error": "Invalid role"},
                status=400
            )

        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            role=role
        )

        user.save()

        if user.role == "02":

            Customer.objects.create(
                user=user,
                phone=data['phone'],
                address=data['address']
            )

            return Response({
                "message": "Customer created",
                "user_code": user.user_code
            })

        elif user.role == "01":

            Employee.objects.create(
                user=user,
                phone=data['phone'],
                address=data['address']
            )

            return Response({
                "message": "Employee created",
                "user_code": user.user_code
            })

    except KeyError as e:

        return Response(
            {
                "error": f"Missing field: {e}"
            },
            status=400
        )

    except IntegrityError:

        return Response(
            {
                "error": "Username, email, or user_code already exists."
            },
            status=400
        )

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=500
        )
        
    
    
    

#log_in method .

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    #print("username:", username)
    #print("password:", password)

    user = authenticate(
        username=username,
        password=password
    )

    #print("authenticated:", user)

    if user is None:
        return Response(
            {"error":"Invalid credentials"},
            status=401
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "username": user.username,
            "id": user.user_code,
            "role": user.role
        }
    })
    
    
    
 #log_out method .
@api_view(['POST'])
def log_out(request):
    # Logic to handle user logout
    # Note: With JWT, logout is typically handled on the client side by deleting the token.
    try:
        refresh_token = request.data.get("refresh")
        if refresh_token is None:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        token = RefreshToken(refresh_token) # type: ignore
        token.blacklist()  # Blacklist the refresh token
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def update_user(request, user_id):
    try:
        user = None

        # 🔍 Find user
        try:
            user = Customer.objects.get(user_id=user_id)
        except Customer.DoesNotExist:
            user = Employee.objects.get(user_id=user)

        # ✏️ Update fields
        user.username = request.data.get('username', user.username)

        # 🔐 Update password safely
        if request.data.get('password'):
            user.password = make_password(request.data.get('password'))

        user.save()

        return Response({
            "message": "User updated successfully"
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "error": "User not found"
        }, status=status.HTTP_404_NOT_FOUND)
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user_id = request.query_params.get('user_id')
    role = request.query_params.get('role')
    
    if not user_id or not role:
        return Response(
            {"error": "user_id and role required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        if role == "customer":
            obj = Customer.objects.get(user_id=user_id)
        elif role == "employee":
            obj = Employee.objects.get(user_id=user_id)
        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "role": role,
            "data": {
                "username": obj.user.username,
                #"email": obj.user.email,
                "phone": obj.phone,
                "address": obj.address,
                "user_id": obj.user.user_code
            }
        })
    except (Customer.DoesNotExist, Employee.DoesNotExist):
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    