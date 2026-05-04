from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status

# Create your views here.
@api_view(['POST'])
def register_customer(request):
    serializers = CustomerSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save(role='customer')
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def register_employee(request):
    serializers = EmployeeSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save(role='employee')
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_user(request):
    # Logic to verify user credentials
    pass
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from .models import Customer, Employee
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = None
    role = None

    # 🔍 Find Customer
    try:
        user = Customer.objects.get(username=username)
        role = "customer"
    except Customer.DoesNotExist:
        pass

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
    if not check_password(password, user.password):
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # 🎟 Generate JWT token
    refresh = RefreshToken.for_user(user)

    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {
            "id": user.user_id,
            "username": user.username,
            "role": role
        }
    })

def log_out(request):
    # Logic to handle user logout
    pass
def update_profile(request):
    # Logic to update user profile
    pass
 