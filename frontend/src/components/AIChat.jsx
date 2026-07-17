import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatWithAI } from "../api/api";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm your shopping assistant.",
    },
  ]);

const sendMessage = async () => {
  if (!message.trim()) return;

  const userInput = message;

  // Show user's message immediately
  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userInput,
    },
  ]);

  setMessage("");

  try {
    const response = await chatWithAI(userInput);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: response.data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Sorry, something went wrong.",
      },
    ]);
  }
};

  return (
    <>
      {isOpen && (
        <div
          className="
            fixed
            bottom-20
            right-4
            w-[320px]
            h-[420px]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200
            flex
            flex-col
            overflow-hidden
            z-[9999]
          "
        >
          {/* Header */}
          <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">
                AI Assistant
              </h3>

              <p className="text-[11px] text-gray-300">
                Online
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-2 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                placeholder="Ask..."
                className="
                  flex-1
                  px-3
                  py-2
                  text-sm
                  rounded-lg
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-gray-900
                "
              />

              <button
                onClick={sendMessage}
                className="
                  bg-gray-900
                  text-white
                  px-3
                  rounded-lg
                  hover:bg-black
                "
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed
          bottom-4
          right-4
          w-14
          h-14
          rounded-full
          bg-gray-900
          text-white
          shadow-xl
          flex
          items-center
          justify-center
          hover:scale-110
          transition
          z-[9999]
        "
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}