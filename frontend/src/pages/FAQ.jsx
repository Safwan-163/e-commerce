import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Delivery usually takes 2–5 business days depending on your location."
    },
    {
      q: "What payment methods are available?",
      a: "We accept Cash on Delivery, Card Payments, and Mobile Banking (bKash, Nagad)."
    },
    {
      q: "Can I return a product?",
      a: "Yes, returns are accepted within 7 days if the product is unused and in original condition."
    },
    {
      q: "How can I track my order?",
      a: "After placing an order, you will receive tracking details via SMS or email."
    }
  ];

  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-3">
            Everything you need to know about Bayraha
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full px-4 py-3 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 outline-none transition"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium">{faq.q}</span>
                <span className="text-gray-400">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-gray-600">
                  {faq.a}
                </div>
              )}

            </div>
          ))}

        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Still have questions?
          </p>

          <button className="mt-4 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
            Contact Support
          </button>
        </div>

      </main>

      <Footer />

    </div>
  );
}