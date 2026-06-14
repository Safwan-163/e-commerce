
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

import BayrahaLogo from "./logo";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";
  };
  const dashboardPath =
  user?.role === "01"
    ? "/employee-dashboard"
    : "/customer/dashboard";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              shrink-0
              transition
              hover:opacity-80
            "
          >
            <BayrahaLogo />

            <div className="leading-tight">
              <h1 className="text-2xl font-black tracking-tight">
                Bayraha
              </h1>

              <p className="text-xs text-gray-500">
                Online Store
              </p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3
                  rounded-full
                  bg-gray-100
                  border
                  border-transparent
                  outline-none
                  transition-all
                  focus:bg-white
                  focus:border-gray-300
                  focus:ring-2
                  focus:ring-gray-200
                "
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              className="
                relative
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                hover:bg-gray-100
                transition
              "
            >
              <ShoppingCart size={20} />

              <span className="hidden sm:block font-medium">
                Cart
              </span>

              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  min-w-[20px]
                  h-[20px]
                  rounded-full
                  bg-black
                  text-white
                  text-xs
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>
            </Link>

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">

                <Link
                to={dashboardPath}
  className="
    hidden
    md:flex
    items-center
    gap-2
    px-3
    py-2
    rounded-xl
    bg-gray-100
    hover:bg-gray-200
    transition
  "
>
                  <User size={16} />

                  <span className="text-sm font-medium">
                    {user.username || "User"}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-black
                    text-white
                    hover:opacity-90
                    transition
                  "
                >
                  <LogOut size={18} />

                  <span className="hidden sm:block">
                    Logout
                  </span>
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  border
                  border-gray-300
                  hover:bg-gray-50
                  transition
                "
              >
                <LogIn size={18} />

                <span className="hidden sm:block">
                  Sign In
                </span>
              </Link>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}