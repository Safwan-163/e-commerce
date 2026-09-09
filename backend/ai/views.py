
# from openai import OpenAI
# from openai import AuthenticationError, RateLimitError
from django.test import client
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes


from django.conf import settings
from google import genai

# client = OpenAI(api_key=settings.OPENAI_API_KEY)
client_google = genai.Client(api_key=settings.GOOGLE_API_KEY)

# @api_view(["POST"])
# def chat_google(request):
#     message = request.data.get("message")

#     try:
#         chat = client_google.chats.create(
#             model="gemini-2.5-flash",
#             history=[
#                 {
#                     "role": "user",
#                     "parts": [{"text": "You are a helpful shopping assistant."}]
#                 },
#                 {
#                     "role": "model",
#                     "parts": [{"text": "Understood. I'll help users choose products and answer shopping questions."}]
#                 }
#             ]
#         )

#         response = chat.send_message(message)

#         return Response({
#             "reply": response.text
#         })

#     except Exception as e:
#         return Response(
#             {"reply": str(e)},
#             status=500
#         )

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



SYSTEM_PROMPT = """
You are an AI assistant for our organization.

Official FAQ:

1. Citizen Access

User:
What is the first challenge about? What change in the 2026 amendment could create a new opportunity or requirement for digital legal-aid services?

AI Agent:
The first challenge asks us to identify one change introduced by the 2026 amendment to the Legal Aid Services Act, 2000 that could create a new opportunity or requirement for digital legal-aid service delivery. We also need to explain what has changed legally, what could change operationally, and how technology could support it. The specific section of the amended Act must be mentioned. The script directs us to review the official DBLA Laws section and the amended Act before giving the answer.

2. AI for Legal Aid

User:
What should an AI legal-aid assistant do when Ripon calls about his sister Moyuri?

AI Agent:
The AI can communicate with Ripon in Bangla by voice and use the information collected during the intake process. It should identify what assistance may be needed and collect relevant information for a human legal-aid officer. However, Ripon is not the person directly involved in the case, so everything he provides must be treated as third-party information until it can be safely verified with Moyuri. The AI should not replace the human legal-aid officer or panel lawyer for final legal assistance and case-management decisions. Urgent situations should be transferred for human review.

3. Justice Operations

User:
How can a digital system help a District Legal Aid Officer decide which cases need attention first?

AI Agent:
The system can help officers identify cases that may require immediate attention by considering factors such as urgency, legal merit, vulnerability, or the likelihood of requiring prompt intervention. These factors can be represented digitally so officers can compare incoming cases. However, the system should support the DLAO rather than automatically replace the DLAO's legal judgment. The system should also have safeguards so people are not unfairly deprioritized because of incomplete information, vulnerability, or limited digital access.

4. Online Dispute Resolution (ODR)

User:
How could Moyuri and Sohel's dispute move through online mediation?

AI Agent:
The digital process should cover:

Citizen entry → Eligibility/Intake → Mediation → Outcome → Record/Follow-up

The legal-aid officer wants to see whether Moyuri's maintenance claim and dowry demand can be settled through mediation before a case is filed. The process must also consider that Sohel is now in Gazipur, Moyuri has limited network access and short periods when she can speak, and Ripon cannot read documents sent to him. The system should therefore support these limitations while properly documenting the mediation outcome.

5. Community Innovation

User:
What information in Moyuri's legal-aid file should not be accessible to every DLAS user?

AI Agent:
The script gives several sensitive pieces of information. One example is the communication history showing the times of day when Moyuri can safely talk. This information should not be available to every user or role because it is sensitive case information. Access should be limited according to the person's role and responsibility. The challenge also asks for a design change that would allow Ripon to complete the relevant step independently without a sighted person beside him.

6. AI-Assisted Call Centre & Omnichannel Support

User:
What problem might Ripon face when using the digital legal-aid application?

AI Agent:
Ripon has a smartphone, but he cannot read a form, PDF, CAPTCHA, or OTP, and his phone's screen reader does not properly read most Bangla labels. He also does not know Moyuri's NID number. The challenge asks us to identify one specific difficulty in the existing application process and propose a technology-enabled improvement. The solution must work even when there is no working internet, the person filing cannot read a screen, and nothing can be sent to Moyuri's own handset that could put her at risk.

Important: These are script-based AI responses, not official answers to the competition. The script explicitly requires participants to research the DBLA website and relevant laws before submitting answers.

Rules:
- Use the official FAQ when the question relates to it.
- For questions outside the FAQ, answer using your general knowledge.
- Never invent official information.
- If you don't know something, say so.
- Keep answers concise and helpful.
"""
@api_view(["POST"])
@permission_classes(["AllowAny"])
def ask_gemini(question):

    response = client.models.generate_content(
        model="gemini-3.7-flash",
        contents=question,
        config={
            "system_instruction": SYSTEM_PROMPT
        }
    )

    return response.text