import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location = "/login";
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between gap-5">

          {/* Logo */}

          <Link
            to="/"
            className="text-3xl font-bold"
          >
            Bayraha
          </Link>

          {/* Search */}

          <div className="flex-1 max-w-xl">

            <input
              type="text"
              placeholder="Search products..."
              className="
              w-full
              px-5
              py-3
              rounded-full
              bg-gray-100
              outline-none
              focus:ring-2
              focus:ring-gray-300
              "
            />

          </div>

          {/* Right section */}

          <div className="flex items-center gap-6">

            <Link
              to="/cart"
              className="text-lg"
            >
              Cart (0)
            </Link>

            {user ? (

              <button
                onClick={logout}
                className="
                px-4
                py-2
                rounded-lg
                bg-black
                text-white
                hover:opacity-90
                "
              >
                Logout
              </button>

            ) : (

              <Link
                to="/login"
                className="
                px-4
                py-2
                rounded-lg
                border
                "
              >
                Sign In
              </Link>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}