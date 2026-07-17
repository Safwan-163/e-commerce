import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChat from "../components/AIChat";

export default function AboutPage() {
  return (
    <div className="bg-[#f7f7f8] min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">

        {/* HERO */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Redefining modern shopping
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Bayraha is built to deliver a clean, premium and reliable shopping
            experience for everyday life.
          </p>
        </section>

        {/* STORY */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="about"
            className="rounded-2xl object-cover"
          />

          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Our Story
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Bayraha started with a simple vision — to make online shopping
              easier, more transparent and more enjoyable. We focus on
              delivering quality products with a smooth and modern experience.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              From curated collections to reliable service, every detail is
              designed to create trust and convenience for our customers.
            </p>
          </div>

        </section>

        {/* VALUES */}
        <section className="max-w-6xl mx-auto px-6 py-16">

          <h2 className="text-2xl font-semibold mb-10 text-center">
            What We Value
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Value title="Quality First">
              We carefully select products that meet our standards of durability and design.
            </Value>

            <Value title="Customer Trust">
              Transparency and reliability are at the core of everything we do.
            </Value>

            <Value title="Modern Experience">
              Clean design and smooth interactions define our platform.
            </Value>

          </div>

        </section>

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">

          <Stat number="10K+" label="Customers" />
          <Stat number="500+" label="Products" />
          <Stat number="99%" label="Satisfaction" />
          <Stat number="24/7" label="Support" />

        </section>
        <AIChat />
      </main>

      <Footer />

    </div>
  );
}

/* Value Card */
function Value({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  );
}

/* Stat Card */
function Stat({ number, label }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
      <h2 className="text-xl font-semibold">{number}</h2>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
      
    </div>
  );
}