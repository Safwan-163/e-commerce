import { useState } from "react";
import EmployeeSidebar from "../components/Employee_sidebar";
import { deleteProduct } from "../api/api";

export default function DeleteProduct() {
  const [productCode, setProductCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!productCode.trim()) {
      alert("Please enter a product code");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${productCode}?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await deleteProduct(productCode);

      alert(response.message);

      setProductCode("");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.error ||
        "Failed to delete product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />

      <div className="flex-1 p-8">
        <div className="max-w-md bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-2">
            Delete Product
          </h1>

          <p className="text-gray-500 mb-6">
            Enter the product code of the item you want
            to remove.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              value={productCode}
              onChange={(e) =>
                setProductCode(e.target.value)
              }
              placeholder="Product Code"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
              "
            />

            <button
              onClick={handleDelete}
              disabled={loading}
              className="
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                font-semibold
                py-3
                rounded-lg
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Deleting..."
                : "Delete Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}