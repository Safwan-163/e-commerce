import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentPage() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1">

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT: Form */}
          <div className="md:col-span-2 space-y-8">

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Shipping Details</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input className="input" placeholder="Full Name" />
                <input className="input" placeholder="Phone Number" />
                <input className="input md:col-span-2" placeholder="Address" />
                <input className="input" placeholder="City" />
                <input className="input" placeholder="Postal Code" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Payment Method</h3>

              <div className="space-y-3">

                <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                  <input type="radio" name="payment" />
                  <span>Card Payment</span>
                </label>

                <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer">
                  <input type="radio" name="payment" />
                  <span>Mobile Banking (bKash / Nagad)</span>
                </label>

              </div>
            </div>

          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Products</span>
                <span>$320</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$325</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
              Pay Now
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}