import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";

import { getProduct, getProducts } from "../api/api";

export default function ProductDetails() {
  const { product_code } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(product_code);
        setProduct(data);
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

        const filtered = products.filter(
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
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f8] min-h-screen">
      <Navbar />

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

              <p className="mt-8 text-gray-600">
                {product.product_description}
              </p>

              <div className="flex gap-4 mt-10">
                <button className="flex-1 bg-black text-white py-4 rounded-xl">
                  Add To Cart
                </button>

                <button className="flex-1 border border-black py-4 rounded-xl">
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6">
            Specifications
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500">Product Code</p>
                <p className="font-medium">{product.product_code}</p>
              </div>

              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{product.product_type}</p>
              </div>

              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-medium">৳ {product.product_cost}</p>
              </div>

            </div>
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