from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
@api_view(['POST'])
def register_customer(request):
    data=request.data.copy()
    if 'password'in data:
         data['password' ] = make_password(data['password'])
   

    serializers = CustomerSerializer(data=data)
    if serializers.is_valid():
        serializers.save(role='customer')
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_employee(request):
    data=request.data.copy()
    if 'password' in data:
        data['password'] = make_password(data['password'])

    serializers = EmployeeSerializer(data=data)
    if serializers.is_valid():
        serializers.save(role='employee')
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def verify_user(request):
#     username = request.data.get("username")
#     password = request.data.get("password")

#     if not username or not password:
#         return Response({"message": "Username and password required"}, status=400)

#     # 🔍 Check Customer
#     try:
#         user = Customer.objects.get(username=username, password=password)
#         return Response({
#             "message": "Login successful",
#             "role": "customer",
#             "user_id": user.id
#         })
#     except Customer.DoesNotExist:
#         pass

#     # 🔍 Check Employee
#     try:
#         user = Employee.objects.get(username=username, password=password)
#         return Response({
#             "message": "Login successful",
#             "role": "employee",
#             "user_id": user.id
#         })
#     except Employee.DoesNotExist:
#         pass

#     return Response({"message": "Invalid credentials"}, status=401)


#log_in method .
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    
    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    user = None
    role = None

    # 🔍 Find Customer
    try:
        user = Customer.objects.get(username=username)
        role = "customer"
    except Customer.DoesNotExist:
        return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

    # 🔍 Find Employee
    if user is None:
        try:
            user = Employee.objects.get(username=username)
            role = "employee"
        except Employee.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

    # 🔐 Check password (IMPORTANT FIX)
    if not check_password(password, user.password): # type: ignore
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # 🎟 Generate JWT token
    refresh = RefreshToken.for_user(user) # type: ignore

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {
            "id": user.user_id,
            "username": user.username,
            "role": role
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
            user = Employee.objects.get(user_id=user_id)

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
            user = Customer.objects.get(user_id=user_id)
        elif role == "employee":
            user = Employee.objects.get(user_id=user_id)
        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "role": role,
            "data": serializers.data
        })
    except (Customer.DoesNotExist, Employee.DoesNotExist):
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    