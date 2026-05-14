import { useState } from "react";
import EmployeeSidebar from "../components/Employee_sidebar";
// later: import { addProduct } from "../api/api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending to backend:", form);

      // 🔥 future backend connection
      // await addProduct(form);

      alert("Product Added (Demo)");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <EmployeeSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2"
          />

          <button className="bg-black text-white px-4 py-2">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}