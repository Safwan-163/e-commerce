export default function Hero() {
  return (
    <section className="mt-6">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="relative rounded-3xl overflow-hidden h-[500px] flex items-center"
          style={{
            backgroundImage:
              "url('https://cdn.mos.cms.futurecdn.net/xuCNGttvFBvY9nDhwMuWo6.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

          {/* Content */}
          <div className="relative z-10 max-w-xl px-10">

            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
              Elevate Your Lifestyle
            </h2>

            <p className="text-gray-700 text-lg mb-6">
              Discover premium tech crafted for performance, design, and everyday elegance.
            </p>

            <div className="flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
                Shop Now
              </button>

              <button className="px-6 py-3 rounded-full text-sm border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}