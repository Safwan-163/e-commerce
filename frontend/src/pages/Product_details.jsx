import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";

import { getProduct, getProducts } from "../api/api";

export default function ProductDetails() {
const { product_code } = useParams();

const [product, setProduct] = useState(null);
const [details, setDetails] = useState([]);
const [relatedProducts, setRelatedProducts] = useState([]);
const handleAddToCart = async () => {
  try {
    await addToCart(product.product_code);

    alert("Product added to cart.");
  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      navigate("/login");
    }
  }
};

const handleBuyNow = async () => {
  try {
    await addToCart(product.product_code);

    navigate("/cart");
    // or navigate("/checkout");
  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      navigate("/login");
    }
  }
};

useEffect(() => {
const fetchProduct = async () => {
try {
const data = await getProduct(product_code);


    console.log("API Response:", data);
    console.log("DETAILS:", data.details);

    setProduct(data.product);
    setDetails(data.details || []);
  } catch (error) {
    console.log("Product fetch error:", error);
  }
};

if (product_code) {
  fetchProduct();
}


}, [product_code]);

useEffect(() => {
const fetchRelated = async () => {
try {
const products = await getProducts();


    const productList = products.data || products;

    const filtered = productList.filter(
      (item) =>
        item.product_code !== product_code &&
        item.product_type === product?.product_type
    );

    setRelatedProducts(filtered);
  } catch (error) {
    console.log("Related products error:", error);
  }
};

if (product) {
  fetchRelated();
}


}, [product, product_code]);

if (!product) {
return ( <div className="min-h-screen flex items-center justify-center text-xl">
Loading... </div>
);
}

return ( <div className="bg-[#f7f7f8] min-h-screen"> <Navbar />


  <main className="max-w-7xl mx-auto px-6 py-12">

    {/* PRODUCT SECTION */}
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 p-8">

        {/* IMAGE */}
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={`http://127.0.0.1:8000${product.product_image}`}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col">

          <p className="uppercase text-sm tracking-widest text-gray-400">
            {product.product_type}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.product_name}
          </h1>

          <div className="mt-6">
            <span className="text-4xl font-bold">
              ৳ {product.product_cost}
            </span>
          </div>

          <div className="mt-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <span className="px-3 py-2 bg-gray-100 rounded-full text-sm">
              Genuine Product
            </span>

            <span className="px-3 py-2 bg-gray-100 rounded-full text-sm">
              Fast Delivery
            </span>

            <span className="px-3 py-2 bg-gray-100 rounded-full text-sm">
              Secure Payment
            </span>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3">
              Description
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {product.product_description}
            </p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
  disabled={product.stock === 0}
  onClick={handleAddToCart}
  className={`flex-1 py-4 rounded-xl transition ${
    product.stock > 0
      ? "bg-black text-white hover:opacity-90"
      : "bg-gray-300 cursor-not-allowed"
  }`}
>
  Add To Cart
</button>
            <button
  disabled={product.stock === 0}
  onClick={handleBuyNow}
  className={`flex-1 py-4 rounded-xl transition ${
    product.stock > 0
      ? "border border-black hover:bg-black hover:text-white"
      : "border border-gray-300 cursor-not-allowed"
  }`}
>
              Buy Now
            </button>
            
          </div>

        </div>
      </div>
    </div>

    {/* SPECIFICATIONS */}
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">
          Specifications
        </h2>

        <span className="text-gray-400 text-sm">
          Product Details
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="border-b">
          <div className="grid md:grid-cols-2">

            <div className="p-5 border-r">
              <p className="text-sm text-gray-500">
                Product Code
              </p>

              <p className="font-medium mt-1">
                {product.product_code}
              </p>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="font-medium mt-1">
                {product.product_type}
              </p>
            </div>

          </div>
        </div>

        {details && details.length > 0 ? (
          details.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between items-center px-6 py-4 border-b last:border-b-0"
            >
              <span className="text-gray-500">
                {item.key}
              </span>

              <span className="font-medium text-right">
                {item.value}
              </span>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No specifications available.
          </div>
        )}
      </div>
    </section>

    {/* RELATED PRODUCTS */}
    <section className="mt-20">

      <div className="mb-8">
        <p className="uppercase text-sm text-gray-400">
          Similar Products
        </p>

        <h2 className="text-3xl font-semibold mt-2">
          You May Also Like
        </h2>
      </div>

      <ProductGrid products={relatedProducts.slice(0, 4)} />

    </section>

  </main>

  <Footer />
</div>


);
}
