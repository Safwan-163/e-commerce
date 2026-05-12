import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
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