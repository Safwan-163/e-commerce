
from django.contrib import admin
from django.urls import include, path
from users import views as user_views
from products import views as product_views
from cart import views as cart_views
from core import views as core_views
from orders import views as order_views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('api/', include('api.urls')),
]



urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)