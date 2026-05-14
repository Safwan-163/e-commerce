from django.urls import path, include
from . import views

urlpatterns = [
    path('product-details/', views.get_details, name='product_details'),
    path('list-products/', views.list_products, name='list_products'),
    path('add-product/', views.add_product, name='add_product'),
    path('remove-product/', views.remove_product, name='remove_product'),
    path('update-product/', views.update_product_details, name='update_product'),
    path('product-analytics/', views.product_analytics, name='product_analytics'),
    
]