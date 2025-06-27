import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMsg("Registration successful! You can now log in.");
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow rounded border">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" required className="w-full p-2 border rounded"
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" required className="w-full p-2 border rounded"
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" required className="w-full p-2 border rounded"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600">Register</button>
        <p className="text-sm text-gray-600 mt-2">{msg}</p>
      </form>
    </div>
  );
}

export default Register;
