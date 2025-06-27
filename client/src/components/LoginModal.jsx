// ✅ LoginModal.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const LoginModal = ({ isOpen, onClose, onOpenRegister, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      onLoginSuccess(res.data.user);
      setForm({ email: "", password: "" });
      setMsg("");
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1200);
    } catch (err) {
      setMsg(err.response?.data?.error || "❌ Login failed. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 mx-4 sm:mx-0 animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
          aria-label="Close login modal"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-center text-rose-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login to your StayFinder account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {msg && (
            <p
              className={`text-center text-sm ${
                msg.includes("success") ? "text-green-600" : "text-red-500"
              }`}
            >
              {msg}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{' '}
          <span
            onClick={onOpenRegister}
            className="text-rose-600 font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;