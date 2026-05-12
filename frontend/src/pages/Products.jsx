import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res); // ✅ fixed
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#f7f7f8] min-h-screen text-gray-900">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-10 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
            All Products
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Discover Premium Collection
          </h1>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore carefully selected products designed for performance, comfort, and modern lifestyle.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {["All", "Electronics", "Wearables", "Accessories", "New"].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-full text-sm bg-white border border-gray-200 hover:bg-gray-100 transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* ✅ pass backend data */}
        <ProductGrid products={products} />

      </main>

      <Footer />
    </div>
  );
}