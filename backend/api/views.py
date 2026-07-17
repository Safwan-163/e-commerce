from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from openai import OpenAI
from django.conf import settings

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django"})




