export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 pt-10 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Bayraha</h2>
          <p className="text-gray-600">
            Your trusted platform for quality products and modern shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/products" className="hover:text-black">Products</a></li>
            <li><a href="/about" className="hover:text-black">About</a></li>
            <li><a href="/contact" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/faq" className="hover:text-black">FAQ</a></li>
            <li><a href="/returns" className="hover:text-black">Returns</a></li>
            <li><a href="/shipping-policy" className="hover:text-black">Shipping</a></li>
            <li><a href="/privacy-policy" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-600">📞 8801998561097</p>
          <p className="text-gray-600">✉️ bayrahainternational@gmail.com</p>
          <p className="text-gray-600">
            📍 78/A Green Road, Tejgaon, Dhaka, Bangladesh
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-8 pt-4 text-center text-gray-500 text-xs">
        © 2026 Bayraha. All rights reserved.
      </div>
    </footer>
  );
}