import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import OrdersChart from "../components/OrdersChart";


// import {
//   getDashboardStats,
//   getWeeklyOrders,
// } from "../api/api";

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsData = await getDashboardStats();
      const weeklyData = await getWeeklyOrders();

      setStats(statsData);

      const formatted = weeklyData.map((item) => ({
        week: new Date(item.day).toLocaleDateString(),
        orders: item.orders,
      }));

      setChartData(formatted);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  return (
    <div className="bg-[#f7f7f8] min-h-screen">
      <Navbar />

      <div className="p-6 space-y-6">
        {/* OVERVIEW */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Total Orders" value={stats.total_orders || 0} />
          <StatCard title="This Week" value={stats.weekly_orders || 0} />
          <StatCard title="Revenue" value={`$${stats.total_revenue || 0}`} />
          <StatCard title="Customers" value={stats.total_customers || 0} />
          <StatCard title="Returned" value={stats.returned_orders || 0} />
          <StatCard title="In Delivery" value={stats.in_delivery || 0} />
        </div>

        {/* ACTION PANEL */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Manage Products</h2>
            <p className="text-gray-500 text-sm">
              Add, update or remove products
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-80">
              Add
            </button>
            <button className="px-4 py-2 rounded-xl border hover:bg-gray-100">
              Update
            </button>
            <button className="px-4 py-2 rounded-xl border text-red-500 hover:bg-red-50">
              Delete
            </button>
          </div>
        </div>

        {/* CHART */}
        <OrdersChart data={chartData} />
      </div>
    </div>
  );
}