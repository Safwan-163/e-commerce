from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from users.models import Employee
from orders.models import Order
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Create your views here.
# Method for confirming payment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    order_id = request.data.get('order_id')

    if not order_id:
        return Response({"error": "Order ID required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        order_id = int(order_id)
        
    except ValueError:
        return Response({"error": "Invalid Order ID"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        order=Order.objects.get(id=order_id)
        order.payment_status ='paid'
        order.save()
        return Response({
            "message": "Payment confirmed",
            "order_id": order_id
        })
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    
# Method for checking payment status
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_payment_status(request):
    order_id = request.query_params.get('order_id')

    if not order_id:
        return Response({"error": "Order ID required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        order_id = int(order_id)
    except ValueError:
        return Response({"error": "Invalid Order ID"}, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # return Response({
    #     "order_id": order_id,
    #     "payment_status": "Paid"  # dummy
    # })


