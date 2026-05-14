import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { getProductAnalytics } from "../api/api";

export default function ProductAnalytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProductAnalytics();
      setProducts(data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="bg-[#f7f7f8] min-h-screen">
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">
          Product Analytics
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">Product ID</th>
                <th className="p-4">Customers</th>
                <th className="p-4">Total Sold</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.id}</td>
                  <td className="p-4">{p.total_customers}</td>
                  <td className="p-4">{p.total_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}