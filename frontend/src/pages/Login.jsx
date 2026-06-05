import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("users/login/", {
        username,
        password,
      });

      // Save tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      console.log("Login Response:", res.data);

      const role = res.data.user.role;
      const userId = res.data.user.id;

     

if (role === "01") {
 
  alert("user id is " + userId);
  window.location.href = "/employee-dashboard";
} else if (role === "02") {
  alert("user id is " +userId);
  window.location.href = "/customer/dashboard";
} else {
  alert("Unknown role. Please contact support.");     }

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Invalid username or password");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f8] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">
            Bayraha
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back 👋
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}