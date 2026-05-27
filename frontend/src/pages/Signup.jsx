import { useState } from "react";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Signup
  const handleSignup = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    setError("");

    try {

      const payload = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
      };

      const res = await api.post(
        "users/register/",
        payload
      );

      console.log(res.data);

      setMessage("Account created successfully!");

      // Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.log(err.response?.data);

      setError(
        err.response?.data?.error ||
        "Signup failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-black">
            Bayraha
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        {/* Success Message */}
        {message && (

          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-xl mb-4 text-center">
            {message}
          </div>

        )}

        {/* Error Message */}
        {error && (

          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >

          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <User
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <User
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <Mail
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <Lock
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Role */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <User
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="text"
              name="role"
              placeholder="Role (customer/admin)"
              value={formData.role}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <Phone
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Address */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">

            <MapPin
              size={18}
              className="text-gray-400 mr-3"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"}

          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </span>

        </div>

      </div>

    </div>
  );
}