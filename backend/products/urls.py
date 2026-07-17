from django.urls import path, include
from . import views

urlpatterns = [
    path('product-details/<str:product_code>/', views.view_product,name='product_details'),
    path('all-products/', views.view_all_product, name='view_all_product'),
   # path('list-products/', views.list_products, name='list_products'),
    path('add-product/', views.add_product, name='add_product'),
    path('remove-product/<str:product_code>/', views.remove_product, name='remove_product'),
    path('update-product/<str:product_code>/', views.update_product, name='update_product'),
    path('product-analytics/', views.product_analytics, name='product_analytics'),
    path('product-to-update/<str:product_code>/', views.product_to_update, name='product_to_update'),
    path( "products/<int:pk>/stock/", views.update_stock, name="update_stock"),
]