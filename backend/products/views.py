from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


# Create your views here.
def add_to_cart(request):
    # Logic to add product to cart
    pass
def view_cart(request):
    # Logic to view cart items
    pass
def remove_from_cart(request):
    # Logic to remove product from cart
    pass
def get_details(request):
    # Logic to get product details
    pass
def list_products(request):
    # Logic to list all products
    pass
