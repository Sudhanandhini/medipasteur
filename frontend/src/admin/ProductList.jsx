import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSub, setFilterSub] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d))
      .catch(() => {});
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  // Unique sub-categories for the selected category filter
  const subCategories = [
    ...new Set(
      products
        .filter((p) => !filterCategory || String(p.category_id) === filterCategory)
        .map((p) => p.sub_category)
        .filter(Boolean)
    ),
  ].sort();

  // Apply all filters
  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCategory || String(p.category_id) === filterCategory;
    const matchSub = !filterSub || p.sub_category === filterSub;
    return matchSearch && matchCat && matchSub;
  });

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "-";

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} of {products.length} products
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex flex-wrap gap-3 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Search</label>
          <div className="relative">
            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Name or SKU..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setFilterSub(""); }}
              className="w-full border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="min-w-[160px]">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setFilterSub(""); }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Sub-category Filter */}
        <div className="min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Sub Category</label>
          <select
            value={filterSub}
            onChange={(e) => setFilterSub(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">All Sub Categories</option>
            {subCategories.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Clear */}
        {(search || filterCategory || filterSub) && (
          <button
            onClick={() => { setSearch(""); setFilterCategory(""); setFilterSub(""); }}
            className="px-4 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Product Name</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Sub Category</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Image</th>
              <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="p-3 font-medium text-gray-900">{p.name}</td>
                  <td className="p-3 text-gray-500 font-mono text-xs">{p.sku}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {getCategoryName(p.category_id)}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-xs">{p.sub_category || "-"}</td>
                  <td className="p-3">
                    {p.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${p.image}`}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt={p.name}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-lg">
                        💊
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
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
