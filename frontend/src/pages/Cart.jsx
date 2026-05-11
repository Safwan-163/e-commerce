import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { placeOrder } from "../api/api";

export default function CartPage() {

// CART
export const getCart = () => API.get("cart/");

export const addToCart = (data) => API.post("cart/add/", data);

export const removeFromCart = (data) => API.post("cart/remove/", data);

export const clearCart = () => API.post("cart/clear/");

  const cartItems = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129,
      quantity: 1,
      image: "https://www.ryans.com/storage/products/main/wiwu-soundcool-black-on-ear-bluetooth-headphone-11699190302.webp"
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 199,
      quantity: 2,
      image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/colmi/p81/p81-01-228x228.webp"
    }
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1">

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight mb-10">
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT: Cart Items */}
          <div className="md:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-lg transition"
              >

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">

                    <button className="px-3 py-1 border rounded-lg">-</button>
                    <span>{item.quantity}</span>
                    <button className="px-3 py-1 border rounded-lg">+</button>

                    <button className="ml-auto text-sm text-red-500 hover:underline">
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT: Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${subtotal + 5}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
              Proceed to Checkout
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}