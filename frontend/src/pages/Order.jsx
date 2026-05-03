import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrderPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      price: 129,
      quantity: 1,
      image:
        "https://www.ryans.com/storage/products/main/wiwu-soundcool-black-on-ear-bluetooth-headphone-11699190302.webp",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 299,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9hM3Mnght-EESx8KWs4AXsUzhkbf71sheQ&s",
    },
  ]);

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#f7f7f8] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Your Order
          </h1>

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-gray-500 text-sm">${item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(item.id, "dec")}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, "inc")}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="font-semibold">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>$5</span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${subtotal + 5}</span>
          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded-full hover:opacity-90 transition">
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}