import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#f7f7f8] text-gray-900">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-20">

        {/* Hero Section */}
        <section>
          <Hero />
        </section>

        {/* Recommended Section */}
        <section className="relative">

  {/* Section Header */}
  <div className="mb-8 text-center md:text-left">
    <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
      Personalized Picks
    </p>

    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
      Recommended for You
    </h2>

    <p className="mt-3 text-gray-500 max-w-xl mx-auto md:mx-0">
      Carefully selected products based on quality, performance, and modern lifestyle trends.
    </p>
  </div>

  {/* Product Grid */}
  <ProductGrid />

</section>

        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Trending Categories
            </h2>
            <p className="text-sm text-gray-500 hidden md:block">
              Explore what’s popular right now
            </p>
          </div>

          <Categories />
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}