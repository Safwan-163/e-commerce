import { Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 space-y-6">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue your experience
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1">
            <Mail size={18} className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-1">
            <Lock size={18} className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-xl text-sm hover:opacity-90 transition">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google */}
        <button className="w-full border py-3 rounded-xl text-sm hover:bg-gray-50 transition">
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Don’t have an account? <span className="text-black font-medium cursor-pointer">Sign up</span>
        </p>

      </div>
    </div>
  );
}