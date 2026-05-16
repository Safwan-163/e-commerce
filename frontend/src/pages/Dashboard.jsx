import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { logoutUser } from "../api/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // 🔗 Example backend fetch (replace URL with your Django API later)
  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/user"); // backend endpoint
        const orderRes = await fetch("/api/orders");

        const userData = await userRes.json();
        const orderData = await orderRes.json();

        setUser(userData);
        setOrders(orderData);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-[#f7f7f8] min-h-screen text-gray-900">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your orders, profile, and activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-semibold mt-2">
              {orders?.length || 0}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Account Status</p>
            <h2 className="text-2xl font-semibold mt-2 text-green-600">
              Active
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Member Since</p>
            <h2 className="text-2xl font-semibold mt-2">
              {user?.createdAt ? new Date(user.createdAt).getFullYear() : "--"}
            </h2>
          </div>

        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Recent Orders
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {orders.length === 0 ? (
              <p className="p-6 text-gray-500">No orders found.</p>
            ) : (
              <div className="divide-y">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.status}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${order.total}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}