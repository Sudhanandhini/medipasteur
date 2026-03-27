import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  // Derive stats
  const totalProducts = products.length;
  const categories = [...new Set(products.map((p) => p.category_id).filter(Boolean))].length;
  const recent = [...products].reverse().slice(0, 5);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        </svg>
      ),
      color: "#4e897d",
      bg: "#4e897d15",
    },
    {
      label: "Categories",
      value: categories,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      color: "#384a72",
      bg: "#384a7215",
    },
    {
      label: "Active Listings",
      value: totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "#059669",
      bg: "#05966915",
    },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back — here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Products</h2>
            <p className="text-xs text-gray-400 mt-0.5">Last {recent.length} added</p>
          </div>
          <button
            onClick={() => navigate("/admin/products")}
            className="text-xs font-semibold px-4 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#4e897d" }}
          >
            View All
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-400">No products yet.</td>
              </tr>
            ) : (
              recent.map((p, i) => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-6 py-3.5 font-semibold text-gray-800">{p.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{p.sku}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                        className="px-3 py-1 text-xs font-semibold rounded-lg"
                        style={{ backgroundColor: "#4e897d15", color: "#4e897d" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
