import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EmployeeSidebar from "../components/Employee_sidebar";
import {
  getProductToUpdate,
  updateProduct,
} from "../api/api";

export default function UpdateProduct() {
  const { product_code } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cost: "",
    description: "",
    type: "",
    image: "",
  });

  const [details, setDetails] = useState([]);

  useEffect(() => {
    loadProduct();
  }, [product_code]);

 const loadProduct = async () => {
  try {
    setLoading(true);

    const res = await getProductToUpdate(product_code);

    console.log("PRODUCT DATA:", res);

    setForm({
      name: res.name || "",
      cost: res.cost || "",
      description: res.description || "",
      type: res.type || "",
      image: res.image || "",
    });

    setDetails(res.details || []);
  } catch (err) {
    console.error("LOAD ERROR:", err);
    console.log(err?.response?.data);

    alert("Failed to load product");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailChange = (index, field, value) => {
    const updated = [...details];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setDetails(updated);
  };

  const addDetail = () => {
    setDetails([
      ...details,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeDetail = (index) => {
    setDetails(
      details.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const payload = {
        name: form.name,
        cost: form.cost,
        description: form.description,
        type: form.type,
        image: form.image,
        details,
      };

      console.log(payload);

      await updateProduct(
        product_code,
        payload
      );

      alert("Product Updated Successfully");

      loadProduct();
    } catch (err) {
      console.error(err);

      console.log(
        err?.response?.data
      );

      alert(
        err?.response?.data?.error ||
          "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <EmployeeSidebar />
        <div className="p-10 text-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1 p-8">
        <div
          className="
            max-w-5xl
            mx-auto
            bg-white
            rounded-3xl
            border
            border-gray-200
            shadow-sm
            p-8
          "
        >
          <h1
            className="
              text-3xl
              font-black
              mb-8
            "
          >
            Update Product
          </h1>

          {form.image && (
            <img
              src={form.image}
              alt="product"
              className="
                w-44
                h-44
                object-cover
                rounded-2xl
                border
                mb-6
              "
            />
          )}

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="
                p-4
                rounded-xl
                border
                bg-gray-50
              "
            />

            <input
              name="cost"
              value={form.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="
                p-4
                rounded-xl
                border
                bg-gray-50
              "
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="
                p-4
                rounded-xl
                border
                bg-gray-50
              "
            >
              <option value="">
                Select Type
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

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="
                p-4
                rounded-xl
                border
                bg-gray-50
              "
            />

          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={5}
            className="
              w-full
              mt-4
              p-4
              rounded-xl
              border
              bg-gray-50
            "
          />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-bold">
                Product Features
              </h2>

              <button
                onClick={addDetail}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-gray-200
                  hover:bg-gray-300
                "
              >
                + Add Feature
              </button>

            </div>

            {details.map((detail, index) => (
              <div
                key={index}
                className="
                  flex
                  gap-3
                  mb-3
                "
              >
                <input
                  value={detail.key}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "key",
                      e.target.value
                    )
                  }
                  placeholder="Feature"
                  className="
                    flex-1
                    p-3
                    rounded-xl
                    border
                  "
                />

                <input
                  value={detail.value}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="Value"
                  className="
                    flex-1
                    p-3
                    rounded-xl
                    border
                  "
                />

                <button
                  onClick={() =>
                    removeDetail(index)
                  }
                  className="
                    px-4
                    rounded-xl
                    bg-red-500
                    text-white
                  "
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
              mt-8
              px-8
              py-4
              rounded-xl
              bg-black
              text-white
              font-semibold
              hover:opacity-90
              transition
            "
          >
            {saving
              ? "Updating..."
              : "Update Product"}
          </button>

        </div>
      </div>
    </div>
  );
}