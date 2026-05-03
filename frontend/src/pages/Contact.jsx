import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1">

        {/* Heading */}
        <div className="mb-12 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Get in touch
          </h1>
          <p className="text-gray-500 mt-3">
            Have a question or need help? We’d love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT: Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="font-semibold mb-4">Send a message</h3>

            <form className="space-y-4">

              <input className="input" placeholder="Your Name" />
              <input className="input" placeholder="Email Address" />

              <textarea
                className="input h-32 resize-none"
                placeholder="Your Message"
              ></textarea>

              <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
                Send Message
              </button>

            </form>

          </div>

          {/* RIGHT: Info */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Contact Info</h3>

              <p className="text-gray-600 text-sm">
                📞 01644010184
              </p>

              <p className="text-gray-600 text-sm mt-2">
                ✉️ bayrahainternational@gmail.com
              </p>

              <p className="text-gray-600 text-sm mt-2">
                📍 78/A Green Road, Dhaka, Bangladesh
              </p>
            </div>

            {/* Optional Support Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">Support Hours</h3>

              <p className="text-gray-600 text-sm">
                Sunday - Thursday: 9 AM - 6 PM
              </p>

              <p className="text-gray-600 text-sm mt-2">
                Friday - Saturday: Closed
              </p>
            </div>

          </div>

        </div>

        {/* Map */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-sm">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-80 border-0"
          ></iframe>
        </div>

      </main>

      <Footer />

    </div>
  );
}