from . import views
from django.urls import path
urlpatterns = [
    path("chat/", views.chat, name="chat"),
    path("chat_google/", views.chat_google, name="chat_google"),
    
]