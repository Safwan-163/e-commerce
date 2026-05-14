import { useState } from "react";
import EmployeeSidebar from "../components/Employee_sidebar";

export default function UpdateProduct() {
  const [productId, setProductId] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const handleUpdate = async () => {
    console.log("Update product:", productId, form);

    // future:
    // await updateProduct(productId, form);

    alert("Updated (Demo)");
  };

  return (
    <div className="flex">
      <EmployeeSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        <input
          placeholder="Product ID"
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 mb-2"
        />

        <input
          placeholder="New Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mb-2"
        />

        <input
          placeholder="New Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 mb-2"
        />

        <button
          onClick={handleUpdate}
          className="bg-black text-white px-4 py-2"
        >
          Update
        </button>
      </div>
    </div>
  );
}