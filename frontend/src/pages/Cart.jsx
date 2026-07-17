// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useEffect, useState } from "react";
// import { getCart, removeFromCart } from "../api/api";

// export default function CartPage() {
//  const [cart, setCart] = useState({
//   items: [],
//   total_items: 0,
//   total_price: 0,
// });

//   // ✅ Fetch cart from Django backend
//   useEffect(() => {
//     fetchCart();
//   }, []);

//  const fetchCart = async () => {
//   try {
//     const res = await getCart();
//     setCart(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

//   // ✅ Remove item
//  const handleRemove = async (cartItemId) => {
//   try {
//     await removeFromCart({
//       cart_item_id: cartItemId,
//     });

//     fetchCart();
//   } catch (err) {
//     console.log(err);
//   }
// };

//   // ✅ Calculate subtotal safely
//   const subtotal = cart.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="bg-[#f7f7f8] min-h-screen flex flex-col">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-6 py-16 flex-1">
//         <h1 className="text-3xl font-semibold tracking-tight mb-10">
//           Your Cart
//         </h1>

//         <div className="grid md:grid-cols-3 gap-10">
//           {/* LEFT */}
//           <div className="md:col-span-2 space-y-6">
//             {cartItems.length === 0 ? (
//               <p className="text-gray-500">Your cart is empty</p>
//             ) : (
//               cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-lg transition"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-24 h-24 object-cover rounded-xl"
//                   />

//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <h2 className="font-medium">{item.title}</h2>
//                       <p className="text-gray-500 text-sm mt-1">
//                         ${item.price}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-3 mt-3">
//                       <span>Qty: {item.quantity}</span>

//                       <button
//                         onClick={() => handleRemove(item.id)}
//                         className="ml-auto text-sm text-red-500 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* RIGHT */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
//             <h3 className="font-semibold mb-4">Order Summary</h3>

//             <div className="space-y-2 text-sm text-gray-600">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${subtotal}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>$5</span>
//               </div>
//             </div>

//             <div className="border-t my-4"></div>

//             <div className="flex justify-between font-medium">
//               <span>Total</span>
//               <span>${subtotal + 5}</span>
//             </div>

//             <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/api";

export default function CartPage() {
  
  const [cart, setCart] = useState({
    items: [],
    total_items: 0,
    total_price: 0,
  });

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart from Django backend
  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Remove item
  const handleRemove = async (cartItemId) => {
    try {
      await removeFromCart({
        cart_item_id: cartItemId,
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight mb-10">
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT */}

          {/* {cart.items.map(item => (
    <div key={item.cart_item_id}>
        ...
    </div>
))} */}


          <div className="md:col-span-2 space-y-6">
            {cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="bg-white rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-medium">{item.title}</h2>

                      <p className="text-gray-500 text-sm mt-1">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <span>Qty: {item.quantity}</span>

                      <button
                        onClick={() => handleRemove(item.cart_item_id)}
                        className="ml-auto text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cart.total_items}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${(subtotal + 5).toFixed(2)}</span>
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