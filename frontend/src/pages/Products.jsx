import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Categories from "../components/Categories";
import Footer from "../components/Footer";



export default function Products() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen text-gray-900">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header Section */}
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

        {/* Filter Bar (UI only, optional later logic) */}
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

        {/* Products */}
        <ProductGrid />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}