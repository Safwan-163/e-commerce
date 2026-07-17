import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
//import api from "../api"; // your axios instance
import axos from "axios";
import api from "../api/axios";
import AIChat from "../components/AIChat";
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("products/all-products/");

      console.log("Products:", response.data);

      // If backend returns a list:
      setProducts(Array.isArray(response.data) ? response.data : []);

      // If backend returns:
      // { products: [...] }
      // use this instead:
      // setProducts(response.data.products || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Discover quality products at the best prices.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">
              {error}
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
<AIChat />
      <Footer />
    </>
  );
}