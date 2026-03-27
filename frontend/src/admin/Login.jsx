import { useState } from "react";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/products";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#f0f3f8" }}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="MediPasteur" className="h-10 w-auto" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-1" style={{ color: "#384a72" }}>Admin Login</h2>
        <p className="text-sm text-gray-400 text-center mb-6">Sign in to manage your products</p>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ "--tw-ring-color": "#384a7240" }}
              onFocus={(e) => (e.target.style.borderColor = "#384a72")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition"
              onFocus={(e) => (e.target.style.borderColor = "#384a72")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#4e897d" }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
