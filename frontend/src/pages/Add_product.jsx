import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../components/Employee_sidebar";
import { addProduct } from "../api/api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name and Price required");
      return;
    }

    try {
      setLoading(true);

      await addProduct({
        name: form.name,
        price: Number(form.price),
        description: form.description,
      });

      alert("Product added successfully");

      // reset form
      setForm({
        name: "",
        price: "",
        description: "",
      });

      // optional redirect
      navigate("/products");
    } catch (err) {
      console.log("Error:", err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7f8]">
      <EmployeeSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white p-6 rounded-xl shadow-sm">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded w-full hover:opacity-80"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}