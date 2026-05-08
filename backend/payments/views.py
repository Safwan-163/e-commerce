from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response    
from rest_framework import status


# Create your views here.
@api_view(['POST'])
def confirm_payment(request):
    order_id = request.data.get('order_id')

    if not order_id:
        return Response({"error": "Order ID required"}, status=status.HTTP_400_BAD_REQUEST)

    # Example logic
    # order = Order.objects.get(id=order_id)
    # order.payment_status = "Paid"
    # order.save()

    return Response({
        "message": "Payment confirmed",
        "order_id": order_id
    })
    
    
@api_view(['GET'])
def get_payment_status(request):
    order_id = request.query_params.get('order_id')

    if not order_id:
        return Response({"error": "Order ID required"}, status=status.HTTP_400_BAD_REQUEST)

    # Example:
    # order = Order.objects.get(id=order_id)

    return Response({
        "order_id": order_id,
        "payment_status": "Paid"  # dummy
    })


