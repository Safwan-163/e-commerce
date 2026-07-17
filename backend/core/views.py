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



from django.utils.timezone import now
from datetime import timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import TruncDay


from django.contrib.auth.models import User
from orders.models import Order

@api_view(['GET'])
def dashboard_stats(request):
    today = now()
    week_ago = today - timedelta(days=7)

    total_orders = Order.objects.count()
    weekly_orders = Order.objects.filter(created_at__gte=week_ago).count()
    total_revenue = sum([o.total_price for o in Order.objects.all()])
    total_customers = User.objects.count()
    returned_orders = Order.objects.filter(status="returned").count()
    in_delivery = Order.objects.filter(status="shipping").count()

    return Response({
        "total_orders": total_orders,
        "weekly_orders": weekly_orders,
        "total_revenue": total_revenue,
        "total_customers": total_customers,
        "returned_orders": returned_orders,
        "in_delivery": in_delivery,
    })


@api_view(['GET'])
def weekly_orders(request):
    data = (
        Order.objects
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(orders=Count('id'))
        .order_by('day')
    )

    return Response(list(data))