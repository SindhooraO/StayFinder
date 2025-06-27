import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
      // Redirect or update auth state here
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your StayFinder account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg text-lg font-medium transition-all"
          >
            Login
          </button>

          {msg && (
            <p className="text-sm text-center text-red-500 mt-2">{msg}</p>
          )}
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-rose-500 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
