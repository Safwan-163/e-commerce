import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f7f7f8] text-gray-900">
      <Navbar />

      {/* Page Container */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg">
            Your privacy matters to us. This policy explains how Bayraha collects, 
            uses, and protects your personal information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-medium mb-4">
              What We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              When you place an order or interact with our platform, we may collect 
              personal information such as your name, phone number, email address, 
              and delivery address.
            </p>
          </section>

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-medium mb-4">
              Why We Collect Your Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect this information to process your orders, manage deliveries, 
              provide customer support, and improve your overall shopping experience.
            </p>
          </section>

          {/* Protection */}
          <section>
            <h2 className="text-2xl font-medium mb-4">
              Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We take appropriate security measures to protect your personal data. 
              Your information is stored securely and is never sold, traded, or 
              shared with third parties except when necessary to fulfill your order.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-medium mb-4">
              Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies to enhance your browsing experience, 
              remember preferences, and analyze site traffic. You can choose to 
              disable cookies through your browser settings.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, 
              feel free to contact us at:
            </p>

            <div className="mt-4 text-gray-800">
              <p>Email: support@bayraha.com</p>
              <p>Phone: +880 1234-567890</p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}