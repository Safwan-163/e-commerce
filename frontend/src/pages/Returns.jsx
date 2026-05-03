import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReturnsPolicy() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Returns Policy
          </h1>
          <p className="text-gray-500 mt-3">
            Please read our return policy carefully before making a purchase.
          </p>
        </div>

        <div className="space-y-10 text-gray-700 text-sm leading-relaxed">

          {/* Eligibility */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Return Eligibility
            </h2>
            <p>
              Returns are accepted within 3–7 days of delivery.
            </p>
          </section>

          {/* Conditions */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Conditions
            </h2>
            <p>The product must meet the following conditions:</p>

            <ul className="list-disc ml-5 mt-2">
              <li>Product must be unused</li>
              <li>Must be in original packaging</li>
              <li>All accessories and tags must be included</li>
            </ul>
          </section>

          {/* Non-returnable */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Non-returnable Items
            </h2>
            <p>The following items cannot be returned:</p>

            <ul className="list-disc ml-5 mt-2">
              <li>Discounted or sale items</li>
              <li>Perishable goods</li>
              <li>Used or damaged items (by customer)</li>
            </ul>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Return Process
            </h2>
            <p>
              To request a return, please contact us using the details below:
            </p>

            <ul className="list-disc ml-5 mt-2">
              <li>📞 Phone: 01644010184</li>
              <li>✉️ Email: bayrahainternational@gmail.com</li>
            </ul>

            <p className="mt-2">
              Our support team will guide you through the return process.
            </p>
          </section>

          {/* Refund */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Refund Method
            </h2>
            <p>
              Once your return is approved, refunds will be processed via:
            </p>

            <ul className="list-disc ml-5 mt-2">
              <li>Cash refund</li>
              <li>Mobile banking (bKash / Nagad)</li>
              <li>Store credit (if applicable)</li>
            </ul>
          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}