export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      
      {/* fallback image */}
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="font-bold mt-3">{product.name}</h3>

      <p className="text-gray-500 text-sm">
        {product.category || "General"}
      </p>

      <div className="flex justify-between mt-3">
        <span className="font-bold">{product.price} BDT</span>
        <button className="bg-yellow-500 px-3 py-1 rounded text-white">
          Add
        </button>
      </div>
    </div>
  );
}