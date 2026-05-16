from .views import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
import views
from django.urls import path
urlpatterns = [
    path('confirm-payment/', views.confirm_payment, name='confirm-payment'),
    path('payment-status/', views.get_payment_status, name='payment-status'),

]