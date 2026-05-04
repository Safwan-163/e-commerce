from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


# Create your views here.
def send_otp(request):
    # Logic to send OTP to user
    pass
def verify_otp(request):
    
    # Logic to verify OTP
    pass
def confirm_payment(request):
    # Logic to confirm payment
    pass
def get_payment_status(request):
    # Logic to get payment status
    pass
def make_payment(request):
    # Logic to handle payment processing
    pass
