import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("access");

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (!query.trim()) return;

      navigate(`/products?search=${query}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1
          className="text-lg font-semibold tracking-wide text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Bayraha
        </h1>

        {/* Search */}
        <div className="hidden md:flex w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 outline-none transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm text-gray-700">

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative hover:text-black transition"
          >
            Cart
            <span className="ml-1 text-xs text-gray-500">(0)</span>
          </button>

          {/* AUTH */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="hover:text-black transition"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="hover:text-black transition"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}