from django.shortcuts import render
from .models import *
from .serializers import *  
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random

# Create your views here.

@api_view(['POST'])
def send_otp(request):
    phone = request.data.get('phone')

    if not phone:
        return Response({"error": "Phone is required"}, status=status.HTTP_400_BAD_REQUEST)

    otp = random.randint(1000, 9999)

    # TEMP: store in session (later use DB or Redis)
    request.session['otp'] = otp
    request.session['phone'] = phone

    print(f"OTP for {phone}: {otp}")  # only for testing

    return Response({"message": "OTP sent successfully"})



@api_view(['POST'])
def verify_otp(request):
    user_otp = request.data.get('otp')

    if not user_otp:
        return Response({"error": "OTP required"}, status=status.HTTP_400_BAD_REQUEST)

    saved_otp = request.session.get('otp')

    if str(user_otp) == str(saved_otp):
        return Response({"message": "OTP verified"})
    else:
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    

@api_view(['POST'])
def process_refund(request):
    order_id = request.data.get('order_id')

    if not order_id:
        return Response({"error": "Order ID required"}, status=status.HTTP_400_BAD_REQUEST)

    # Example:
    # order = Order.objects.get(id=order_id)
    # order.payment_status = "Refunded"
    # order.save()

    return Response({
        "message": "Refund processed",
        "order_id": order_id
    })
