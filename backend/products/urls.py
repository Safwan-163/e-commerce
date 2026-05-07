from django.urls import path, include
from . import views

urlpatterns = [
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),    
    path('view-cart/', views.view_cart, name='view_cart'),
    path('remove-from-cart/', views.remove_from_cart, name='remove_from_cart'),
    path('product-details/', views.get_details, name='product_details'),
    path('list-products/', views.list_products, name='list_products'),
]