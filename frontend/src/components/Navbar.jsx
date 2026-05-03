export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide text-gray-800">
          Bayraha
        </h1>

        {/* Search */}
        <div className="hidden md:flex w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 outline-none transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm text-gray-700">

          <button className="hover:text-black transition">
            Sign In
          </button>

          <button className="relative hover:text-black transition">
            Cart
            <span className="ml-1 text-xs text-gray-500">(0)</span>
          </button>

        </div>

      </div>
    </header>
  );
}