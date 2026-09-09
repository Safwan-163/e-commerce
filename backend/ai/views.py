
# from openai import OpenAI
# from openai import AuthenticationError, RateLimitError
from django.test import client
from rest_framework.response import Response
from rest_framework.decorators import api_view


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

1. Challenge 1 — Citizen Access

Question:
Identify ONE change introduced by the 2026 amendments to the Legal Aid Services Act that creates a new opportunity or requirement for digital legal-aid service delivery. Explain:

What has changed legally?
What could change operationally?
What could technology do to support it?
Give the specific section reference.

Answer:
The file does not provide an answer. It specifically requires participants to review the amended Act and the official DBLA website before answering.

2. Challenge 2 — AI for Legal Aid

Question:
Design an AI-assisted workflow for Ripon's call. Explain:

What AI can do
What AI should not do
When human escalation should occur
What information should be captured for the human legal-aid officer

Possible Answer:

AI can communicate with Ripon through Bangla voice.
It can collect basic information about Moyuri's situation.
It can provide general legal-aid information.
It can record the case details for a human officer.
AI should not make the final legal decision.
Ripon's information must be treated as third-party information until verified with Moyuri.
Violence, immediate danger, or urgent intervention should trigger immediate human review.
A human legal-aid officer should safely verify the information and decide the next legal action.
3. Challenge 3 — Justice Operations

Question:
Design a fair and transparent mechanism for the DLAO to prioritize incoming cases. Choose THREE factors and explain how they can be captured digitally and used without replacing the DLAO's judgment.

Possible Answer — Three Factors:

Urgency — Whether the case requires immediate action or protection.
Vulnerability — Whether the applicant is particularly vulnerable or faces barriers to accessing justice.
Legal Merit/Need — Whether there is a clear legal issue and significant need for legal aid.

The system can display these factors as priority indicators, but the DLAO should make the final decision. Incomplete information should not automatically result in a low priority.

4. Challenge 4 — Online Dispute Resolution (ODR)

Question:
Design the minimum digital process for moving the dispute from legal-aid contact to online mediation and then to a properly documented outcome.

The process must include:

Citizen entry → Eligibility/Intake → Mediation → Outcome → Record/Follow-up

Possible Answer:

Citizen Entry → Intake → Eligibility Check → Safety & Consent Check → Online Mediation → Outcome → Digital Record → Follow-up

Collect the initial information through Ripon.
Check eligibility and basic case details.
Safely obtain Moyuri's consent.
Connect both parties with a mediator.
Conduct mediation through a suitable voice/online channel.
Record the agreement if mediation succeeds.
If mediation fails, refer the matter for further legal action.
If mediation is unsafe because of violence or risk to Moyuri, stop online mediation and refer the case to a human legal-aid officer.
5. Challenge 5 — Community Innovation

Question:
Choose ONE piece of information in DLAS that should not be accessible to every user or role. Explain:

Who should access it
Why they should access it
How technology can restrict access
One design change that would allow Ripon to complete the relevant step independently

Possible Answer:

Information: Moyuri's communication history, especially the times when she can safely talk.

Only authorized legal-aid officers handling the case should access it.
It is sensitive because revealing her safe communication times could put her at risk.
The system should use role-based access control, encryption, and access logs.
For Ripon, the system should provide a fully voice-based Bangla interface compatible with screen readers, allowing him to complete the required step without needing a sighted person.
6. Challenge 6 — AI-Assisted Call Centre & Omnichannel Support

Question:
Identify ONE specific element of the current legal-aid application process that may create difficulty for a citizen. Explain why it is difficult and propose ONE technology-enabled improvement.

The solution must work when:

The citizen has no working internet.
The applicant cannot read a screen.
Nothing can be sent to Moyuri's phone that could put her at risk.

Possible Answer:

Problem: A digital application requiring screen-based information/form completion can be difficult for Ripon because he cannot read forms, CAPTCHA, OTPs, or Bangla labels.

Technology solution: Provide a Bangla voice-based application system through 16699. Ripon could provide information by voice, while the system records it. For steps requiring verification or missing information, the system could route the case to a human officer or authorized Union Digital Center rather than sending risky SMS messages to Moyuri's phone.

Important: The document itself does not provide these answers; these are proposed answers based on the scenarios and requirements stated in the challenge.

Rules:
- Use the official FAQ when the question relates to it.
- For questions outside the FAQ, answer using your general knowledge.
- Never invent official information.
- If you don't know something, say so.
- Keep answers concise and helpful.
"""
@api_view(["POST"])
def ask_gemini(question):

    response = client.models.generate_content(
        model="gemini-3.7-flash",
        contents=question,
        config={
            "system_instruction": SYSTEM_PROMPT
        }
    )

    return response.text