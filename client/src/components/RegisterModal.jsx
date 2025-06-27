import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

  // Password strength validation
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!isPasswordValid(form.password)) {
      setMsg("❌ Password must be 8+ chars, include upper, lower, digit & special character.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMsg("✅ Registration successful!");
      setForm({ name: "", email: "", password: "" }); // ✅ Clear fields
      setTimeout(() => {
        setLoading(false);
        setMsg(""); // ✅ Clear message
        onClose();
      }, 1200);
    } catch (err) {
      setMsg(err.response?.data?.error || "❌ Registration failed.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 mx-4 sm:mx-0"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
          aria-label="Close register modal"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-center text-rose-600 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign up for StayFinder to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
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
            {loading ? "Creating account..." : "Register"}
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
          Already have an account?{" "}
          <span
            onClick={onOpenLogin}
            className="text-rose-600 font-medium cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
