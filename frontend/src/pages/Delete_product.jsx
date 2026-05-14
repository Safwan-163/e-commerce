import { useState } from "react";
import EmployeeSidebar from "../components/Employee_sidebar";

export default function DeleteProduct() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    console.log("Delete product:", id);

    // future:
    // await deleteProduct(id);

    alert("Deleted (Demo)");
  };

  return (
    <div className="flex">
      <EmployeeSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Delete Product</h2>

        <input
          placeholder="Product ID"
          onChange={(e) => setId(e.target.value)}
          className="border p-2 mb-4"
        />

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}