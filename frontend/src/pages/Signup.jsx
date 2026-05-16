import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        username: formData.username || formData.name,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        address: formData.address,
      };

      await signupUser(payload);

      setMessage("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      setMessage("Signup failed. Check backend required fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 space-y-6">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Join Bayraha and start shopping
          </p>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-green-600">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>

          {/* Username */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <User size={18} className="text-gray-400 mr-2" />
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

          {/* Name */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <User size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Mail size={18} className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Lock size={18} className="text-gray-400 mr-2" />
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
          <div className="flex items-center border rounded-xl px-3 py-2">
            <User size={18} className="text-gray-400 mr-2" />
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
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Lock size={18} className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9+ ]+"
              className="w-full outline-none bg-transparent text-sm"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Lock size={18} className="text-gray-400 mr-2" />
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-medium cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}