from .import views
from django.urls import path, include
urlpatterns = [
    path('send-otp/', views.send_otp, name='send_otp'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('process-refund/', views.process_refund, name='process_refund'),
   
    

]