
from django.contrib import admin
from django.urls import include, path
from users import views as user_views
from products import views as product_views
from cart import views as cart_views
from core import views as core_views
from orders import views as order_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('products/', include('products.urls')),
    path('cart/', include('cart.urls')),
    path('orders/', include('orders.urls')),
    path('users/', include('users.urls')),
    path('core/', include('core.urls')),
    path('auth/', include('rest_framework.urls')),
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)