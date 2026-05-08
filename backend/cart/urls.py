from . import views
from django.urls import path
urlpatterns = [
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('view-cart/', views.view_cart, name='view_cart'),
    path('remove-cart-item/', views.remove_from_cart, name='remove_cart_item'),
    path('clear-cart/', views.clear_cart, name='clear_cart'),
    
]
