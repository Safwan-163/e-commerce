import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ShippingPolicy() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16 flex-1">

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Shipping Policy
          </h1>
          <p className="text-gray-500 mt-3">
            Learn how delivery works at Bayraha.
          </p>
        </div>

        <div className="space-y-10 text-gray-700 text-sm leading-relaxed">

          {/* Delivery Areas */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Delivery Areas
            </h2>
            <p>
              We deliver across Bangladesh, including major cities and most rural areas.
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Inside city areas</li>
              <li>Nationwide coverage</li>
            </ul>
          </section>

          {/* Delivery Time */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Delivery Time
            </h2>
            <p>
              Delivery times depend on your location:
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Inside city: 1–2 business days</li>
              <li>Outside city: 3–5 business days</li>
            </ul>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Shipping Charges
            </h2>
            <p>
              Shipping charges may vary depending on your location.
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Inside city: Fixed charge</li>
              <li>Outside city: Based on delivery area</li>
            </ul>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Order Processing Time
            </h2>
            <p>
              All orders are processed within 24 hours after confirmation.
            </p>
          </section>

          {/* Delays */}
          <section>
            <h2 className="text-lg font-semibold mb-2">
              Possible Delays
            </h2>
            <p>
              Delivery may be delayed due to:
            </p>
            <ul className="list-disc ml-5 mt-2">
              <li>Public holidays</li>
              <li>Weather conditions</li>
              <li>High order volume</li>
              <li>Unforeseen logistics issues</li>
            </ul>
          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}