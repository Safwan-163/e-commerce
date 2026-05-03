import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      category: "Audio",
      price: 129,
      image:
        "https://www.ryans.com/storage/products/main/wiwu-soundcool-black-on-ear-bluetooth-headphone-11699190302.webp",
    },
    {
      id: 2,
      title: "Smart Watch",
      category: "Wearable Tech",
      price: 299,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW9hM3Mnght-EESx8KWs4AXsUzhkbf71sheQ&s",
    },
  ];

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