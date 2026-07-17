import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Optional: show message if empty
  if (safeProducts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {safeProducts.map((p) => (
        <div
          key={p.id}
          className="transform transition duration-300 hover:-translate-y-1"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}