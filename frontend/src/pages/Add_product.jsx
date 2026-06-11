import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddProduct() {
  const [product, setProduct] = useState({
    type: "",
    name: "",
    cost: "",
    description: "",
    image: null,
  });

  const [details, setDetails] = useState([
    { key: "", value: "" },
  ]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const addDetail = () => {
    setDetails([...details, { key: "", value: "" }]);
  };

  const removeDetail = (index) => {
    const updated = [...details];
    updated.splice(index, 1);
    setDetails(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("type", product.type);
      formData.append("name", product.name);
      formData.append("cost", product.cost);
      formData.append("description", product.description);

      if (product.image) {
        formData.append("image", product.image);
      }

      formData.append("details", JSON.stringify(details));

      const token = localStorage.getItem("access");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/add-product/",
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Added Successfully!");

      setProduct({
        type: "",
        name: "",
        cost: "",
        description: "",
        image: null,
      });

      setDetails([{ key: "", value: "" }]);

      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Add Product
            </h1>

            <p className="text-gray-500 mt-2">
              Create a new product and add specifications.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border rounded-2xl shadow-sm p-8">

            <form onSubmit={handleSubmit}>

              {/* Product Type */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Product Type
                </label>

                <select
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    rounded-xl
                    bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-gray-300
                  "
                >
                  <option value="">
                    Select Product Type
                  </option>

                  <option value="electronics">
                    Electronics
                  </option>

                  <option value="clothing">
                    Clothing
                  </option>

                  <option value="home_appliances">
                    Home Appliances
                  </option>

                  <option value="books">
                    Books
                  </option>

                  <option value="toys">
                    Toys
                  </option>

                  <option value="beauty">
                    Beauty
                  </option>

                  <option value="sports">
                    Sports
                  </option>

                  <option value="stationary">
                    Stationary
                  </option>
                </select>
              </div>

              {/* Name & Cost */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">

                <div>
                  <label className="block mb-2 font-medium">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      rounded-xl
                      bg-gray-50
                      focus:outline-none
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Product Cost
                  </label>

                  <input
                    type="number"
                    name="cost"
                    value={product.cost}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      rounded-xl
                      bg-gray-50
                      focus:outline-none
                    "
                  />
                </div>

              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="
                    w-full
                    px-4
                    py-3
                    border
                    rounded-xl
                    bg-gray-50
                    resize-none
                    focus:outline-none
                  "
                />
              </div>

              {/* Image */}
              <div className="mb-8">
                <label className="block mb-2 font-medium">
                  Product Image
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    bg-gray-50
                  "
                />
              </div>

              {/* Specifications */}
              <div className="border-t pt-8">

                <div className="flex items-center justify-between mb-5">

                  <h2 className="text-xl font-semibold">
                    Product Specifications
                  </h2>

                  <button
                    type="button"
                    onClick={addDetail}
                    className="
                      px-4
                      py-2
                      border
                      rounded-lg
                      hover:bg-gray-100
                    "
                  >
                    + Add Specification
                  </button>

                </div>

                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-12 gap-3 mb-4"
                  >
                    <input
                      type="text"
                      placeholder="RAM"
                      value={detail.key}
                      onChange={(e) =>
                        handleDetailChange(
                          index,
                          "key",
                          e.target.value
                        )
                      }
                      className="
                        md:col-span-5
                        px-4
                        py-3
                        border
                        rounded-xl
                        bg-gray-50
                      "
                    />

                    <input
                      type="text"
                      placeholder="16GB"
                      value={detail.value}
                      onChange={(e) =>
                        handleDetailChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                      className="
                        md:col-span-5
                        px-4
                        py-3
                        border
                        rounded-xl
                        bg-gray-50
                      "
                    />

                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="
                        md:col-span-2
                        border
                        rounded-xl
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      Remove
                    </button>
                  </div>
                ))}

              </div>

              {/* Submit */}
              <div className="mt-10 flex justify-end">

                <button
                  type="submit"
                  className="
                    px-8
                    py-3
                    bg-black
                    text-white
                    rounded-xl
                    hover:opacity-90
                    transition
                  "
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}