import { Link } from "react-router-dom";
import { addToCart } from "../api/api";

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      const response = await addToCart({
        product_id: product.id,
        quantity: 1,
      });

      alert("Added to cart");
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to add to cart");
    }
  };
  return (
    <div
      className="
      bg-white
      rounded-2xl
      overflow-hidden
      border
      hover:shadow-xl
      transition-all
      duration-300
      h-full
      flex
      flex-col
      "
    >
      {/* Product Image */}

      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
  src={`http://127.0.0.1:8000${product.product_image}`}
  alt={product.product_name}
/>
      </div>

      {/* Content */}

      <div className="p-4 flex flex-col flex-grow">

        {/* Category */}

        <span
          className="
          text-xs
          uppercase
          tracking-wide
          text-gray-500
          mb-2
          "
        >
          {product.product_type}
          {product.product_code && ` - ${product.product_code}`}
        </span>

        {/* Name */}

        <h3
          className="
          text-lg
          font-semibold
          line-clamp-2
          min-h-[56px]
          "
        >
          {product.product_name}
        </h3>

        {/* Description */}

        <p
          className="
          text-sm
          text-gray-500
          mt-2
          line-clamp-2
          "
        >
          {product.product_description}
        </p>

        {/* Price */}

        <div className="mt-4">
          <span
            className="
            text-2xl
            font-bold
            "
          >
            ৳{product.product_cost}
          </span>
        </div>

        {/* Buttons */}

        <div className="mt-auto pt-5 flex gap-2">
 
          <Link
            to={`/products/product-details/${product.product_code || product.id}`} // Use product_code if available, otherwise fallback to id
            className="
            flex-1
            text-center
            border
            rounded-lg
            py-2
            hover:bg-gray-100
            transition
            "
          >
            View
          </Link>

          <button
  onClick={handleAddToCart}
  className="
  flex-1
  bg-black
  text-white
  rounded-lg
  py-2
  hover:opacity-90
  transition
  "
>
  Add Cart
</button>

        </div>

      </div>
    </div>
  );
}