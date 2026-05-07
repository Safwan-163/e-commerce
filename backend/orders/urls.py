from .views import *
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('place-order/', place_order, name='place_order'),
    path('view-orders/', view_orders, name='view_orders'),
    path('update-order-status/', update_order_status, name='update_order_status'),
    path('cancel-order/', cancel_order, name='cancel_order'),
    path('order-details/', order_details, name='order_details'),
    path('list-orders/', list_orders, name='list_orders'),
    path('order-history/', order_history, name='order_history'),
    path('track-order/', track_order, name='track_order'),
    path('return-order/', return_order, name='return_order'),
    path('generate-invoice/', generate_invoice, name='generate_invoice'),
    path('apply-discount/', apply_discount, name='apply_discount'),
]
