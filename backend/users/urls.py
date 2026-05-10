from . import views
from django.urls import path, include
urlpatterns = [
    path('register/',views.register_customer,name='register_customer'),
    path('login/',views.login_user,name='login_user'),
    path('logout/',views.log_out,name='logout_user'),
   # path('user-verification/',views.verify_user,name='user_verification'),
    path('update-profile/',views.update_user ,name='update_profile'),
    path('profile/',views.user_profile,name='user_profile')
    
    
    
]