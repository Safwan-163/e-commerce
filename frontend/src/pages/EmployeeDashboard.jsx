//import { User, Briefcase, DollarSign, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import {logoutUser} from "../survices/auth";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-8">Bayraha</h2>

        <nav className="space-y-4 text-sm text-gray-600">
          <p className="hover:text-black cursor-pointer">Overview</p>
          <p className="hover:text-black cursor-pointer">Orders</p>
          <p className="hover:text-black cursor-pointer">Products</p>
          <p className="hover:text-black cursor-pointer">Analytics</p>
          <p className="hover:text-black cursor-pointer">Transactions</p>
          <p className="hover:text-black cursor-pointer" onClick={logoutUser}>
            Logout
          </p>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor your business performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat title="Today Orders" value="24" />
          <Stat title="Monthly Revenue" value="$12,400" />
          <Stat title="Total Products" value="320" />
          <Stat title="Total Sales" value="1,230" />
        </div>

        {/* Charts + Top Products */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Sales Chart */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Sales Overview</h3>

            <div className="h-40 flex items-center justify-center text-gray-400">
              Chart goes here
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Top Products</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Headphones</span>
                <span>120 sold</span>
              </li>
              <li className="flex justify-between">
                <span>Smart Watch</span>
                <span>95 sold</span>
              </li>
              <li className="flex justify-between">
                <span>Sneakers</span>
                <span>80 sold</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Recent Orders</h3>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2 text-left">Order ID</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="py-2">#1023</td>
                <td>John</td>
                <td>$120</td>
                <td>Today</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">#1022</td>
                <td>Alex</td>
                <td>$80</td>
                <td>Today</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

/* Stat Card */
function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
    </div>
  );
}