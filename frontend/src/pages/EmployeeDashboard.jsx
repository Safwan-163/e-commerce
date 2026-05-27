import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import OrdersChart from "../components/OrdersChart";
import { useNavigate } from "react-router-dom";
import {
  getDashboardStats,
  getWeeklyOrders,
  getAuthHeaders,
} from "../api/api";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [user, setUser] = useState({
    username: "--",
    phone: "--",
    address: "--",
    user_id: "--",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!savedUser?.id) {
        console.log("No user found");
        return;
      }

      // ========= USER PROFILE =========

      const res = await fetch(
        `/api/user-profile?user_id=${savedUser.id}&role=employee`,
        {
          headers: getAuthHeaders(),
        }
      );

      const userData = await res.json();

      console.log("Employee Profile:", userData);

      setUser({
        username:
          userData?.data?.username || "--",

        phone:
          userData?.data?.phone || "--",

        address:
          userData?.data?.address || "--",

        user_id:
          userData?.data?.user_id || "--",
      });

      // ========= STATS =========

      const statsData =
        await getDashboardStats();

      setStats(statsData || {});

      // ========= WEEKLY CHART =========

      const weeklyData =
        await getWeeklyOrders();

      setChartData(
        Array.isArray(weeklyData)
          ? weeklyData.map((item) => ({
              week: new Date(
                item.day
              ).toLocaleDateString(),

              orders:
                item.orders || 0,
            }))
          : []
      );
    } catch (err) {
      console.log(
        "Employee Dashboard Error:",
        err
      );
    }
  };

  return (
    <div className="bg-[#f7f7f8] min-h-screen">

      <Navbar />

      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* USER INFO */}

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-2xl font-semibold">
            Welcome {user.username}
          </h2>

          <div className="mt-3 text-gray-500 space-y-1">

            <p>
              Username:
              {" "}
              {user.username}
            </p>

            <p>
              Phone:
              {" "}
              {user.phone}
            </p>

            <p>
              Address:
              {" "}
              {user.address}
            </p>

            <p>
              User ID:
              {" "}
              {user.user_id}
            </p>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

          <StatCard
            title="Total Orders"
            value={stats.total_orders || 0}
          />

          <StatCard
            title="This Week"
            value={stats.weekly_orders || 0}
          />

          <StatCard
            title="Revenue"
            value={`$${stats.total_revenue || 0}`}
          />

          <StatCard
            title="Customers"
            value={stats.total_customers || 0}
          />

          <StatCard
            title="Returned"
            value={stats.returned_orders || 0}
          />

          <StatCard
            title="In Delivery"
            value={stats.in_delivery || 0}
          />

        </div>

        {/* PRODUCT ACTIONS */}

        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center">

          <div>

            <h2 className="text-lg font-semibold">
              Manage Products
            </h2>

            <p className="text-gray-500 text-sm">
              Add, update or remove products
            </p>

          </div>

          <div className="flex gap-3 mt-4 md:mt-0">

            <button
              onClick={() =>
                navigate(
                  "/employee/add-product"
                )
              }
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>

            <button
              onClick={() =>
                navigate(
                  "/employee/update-product"
                )
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>

            <button
              onClick={() =>
                navigate(
                  "/employee/delete-product"
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

        {/* CHART */}

        <div className="bg-white p-5 rounded-2xl shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Weekly Orders
          </h2>

          <OrdersChart
            data={chartData}
          />

        </div>

      </div>
    </div>
  );
}