
from openai import OpenAI
from openai import AuthenticationError, RateLimitError
from rest_framework.response import Response
from rest_framework.decorators import api_view


from django.conf import settings
from google import genai

client = OpenAI(api_key=settings.OPENAI_API_KEY)
client_google = genai.Client(api_key=settings.GOOGLE_API_KEY)

@api_view(["POST"])
def chat_google(request):
    message = request.data.get("message")

    try:
        chat = client_google.chats.create(
            model="gemini-2.5-flash",
            history=[
                {
                    "role": "user",
                    "parts": [{"text": "You are a helpful shopping assistant."}]
                },
                {
                    "role": "model",
                    "parts": [{"text": "Understood. I'll help users choose products and answer shopping questions."}]
                }
            ]
        )

        response = chat.send_message(message)

        return Response({
            "reply": response.text
        })

    except Exception as e:
        return Response(
            {"reply": str(e)},
            status=500
        )

# @api_view(["POST"])
# def chat(request):
#     message = request.data.get("message")

#     try:
#         response = client.chat.completions.create(
#             model="gpt-4.1-mini",
#             messages=[
#                 {
#                     "role": "system",
#                     "content": "You are a shopping assistant."
#                 },
#                 {
#                     "role": "user",
#                     "content": message
#                 }
#             ]
#         )

#         return Response({
#             "reply": response.choices[0].message.content
#         })

#     except AuthenticationError:
#         return Response(
#             {"reply": "OpenAI API key is invalid."},
#             status=401
#         )

#     except RateLimitError:
#         return Response(
#             {"reply": "OpenAI API quota has been exceeded. Please check your API billing."},
#             status=429
#         )

#     except Exception as e:
#         return Response(
#             {"reply": str(e)},
#             status=500
#         )