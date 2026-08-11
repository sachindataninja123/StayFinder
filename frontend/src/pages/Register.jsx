import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/authSlice"; // Adjust path to your auth slice

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "guest", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 text-center">
          <h1 className="text-base font-bold text-gray-900">Sign up</h1>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Welcome to StayHaven
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 transition"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phone Number
                </label>
                <span className="text-xs text-gray-500">(optional)</span>
              </div>

              <div className="relative flex items-center">
                {/* Country Code Prefix */}
                <span className="absolute left-4 text-sm font-semibold text-gray-500 border-r border-gray-300 pr-2 select-none">
                  +91
                </span>

                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData((prev) => ({ ...prev, phone: value }));
                    }
                  }}
                  placeholder="9876543210"
                  className="w-full pl-16 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm text-gray-800 transition"
              />
            </div>

            {/* Role Selection (Toggle Card Style) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Join As
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "guest" })}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition ${
                    formData.role === "guest"
                      ? "border-rose-500 bg-rose-50 text-rose-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Guest
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "admin" })}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition ${
                    formData.role === "admin"
                      ? "border-rose-500 bg-rose-50 text-rose-600"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed pt-1">
              By selecting{" "}
              <span className="font-semibold text-gray-700">
                Agree and continue
              </span>
              , I agree to StayHaven’s Terms of Service and Privacy Policy.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? "Creating account..." : "Agree and continue"}
            </button>
          </form>

          {/* Redirect Link */}
          <div className="mt-6 border-t border-gray-100 pt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 underline hover:text-rose-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
