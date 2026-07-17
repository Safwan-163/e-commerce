import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function UpdateProductSearch() {
  const [productCode, setProductCode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!productCode.trim()) return;

    navigate(`/employee/update-product/${productCode}`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-xl mx-auto pt-20 px-6">

          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">

            <h1 className="text-3xl font-black mb-2">
              Update Product
            </h1>

            <p className="text-gray-500 mb-8">
              Enter a product code to edit product details
            </p>

            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              placeholder="2606010001"
              className="
                w-full
                p-4
                rounded-xl
                border
                border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
              "
            />

            <button
              onClick={handleSearch}
              className="
                w-full
                mt-6
                py-4
                rounded-xl
                bg-black
                text-white
                font-semibold
                hover:opacity-90
                transition
              "
            >
              Find Product
            </button>

          </div>

        </div>
      </div>
    </>
  );
}