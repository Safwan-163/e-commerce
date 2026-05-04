from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


# Create your views here.
def add_to_cart(request):
    # Logic to add item to cart
    pass
def view_cart(request):
    # Logic to view items in cart
    pass
def update_cart(request):
    # Logic to update cart items
    pass
def remove_from_cart(request):
    # Logic to remove item from cart
    pass
def clear_cart(request):
    # Logic to clear all items from cart
    pass
def checkout(request):
    # Logic to handle checkout process
    pass