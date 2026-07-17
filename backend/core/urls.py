from .import views
from django.urls import path, include
urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('process-refund/', views.process_refund, name='process_refund'),
    path("dashboard/stats/", views.dashboard_stats, name='dashboard_stats'),
    path("dashboard/orders-week/", views.weekly_orders, name='weekly_orders'),
    
]   