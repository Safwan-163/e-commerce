from django.urls import path
from django.urls import include, path
from .views import hello

urlpatterns = [
    path('hello/', hello),
    path('products/', include('products.urls')),
    path('cart/', include('cart.urls')),
    path('orders/', include('orders.urls')),
    path('users/', include('users.urls')),
    path('core/', include('core.urls')),
    path('auth/', include('rest_framework.urls')),
    
]