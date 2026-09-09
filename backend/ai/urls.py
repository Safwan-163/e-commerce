from . import views
from django.urls import path
urlpatterns = [
    # path("chat/", views.chat, name="chat"),
    path("chat_google/", views.ask_gemini, name="chat_google"),
    
]