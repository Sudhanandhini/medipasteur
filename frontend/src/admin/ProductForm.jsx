import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category_id: "",
    sub_category: "",
    description: "",
    composition: "",
    pack_size: "",
    indication: "",
    specification: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/item/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name || "",
            sku: data.sku || "",
            category_id: data.category_id || "",
            sub_category: data.sub_category || "",
            description: data.description || "",
            composition: data.composition || "",
            pack_size: data.pack_size || "",
            indication: data.indication || "",
            specification: data.specification || "",
            image: null,
          });
        });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("sku", form.sku);
      formData.append("category_id", form.category_id);
      formData.append("sub_category", form.sub_category);
      formData.append("description", form.description);
      formData.append("composition", form.composition);
      formData.append("pack_size", form.pack_size);
      formData.append("indication", form.indication);
      formData.append("specification", form.specification);
      if (form.image) formData.append("image", form.image);

      const url = id
        ? `${import.meta.env.VITE_API_URL}/api/products/${id}`
        : `${import.meta.env.VITE_API_URL}/api/products`;

      const res = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: { Authorization: token },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error saving product");
        return;
      }

      alert("Product saved successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Something went wrong");
    }
  };

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";
  const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{id ? "Edit Product" : "Add Product"}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{id ? "Update product details below" : "Fill in the details to add a new product"}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left: main fields */}
        <div className="xl:col-span-2 space-y-5">

          {/* Basic info card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4" style={{ color: "#384a72" }}>Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Category</label>
                <select
                  className={inputCls}
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Product Name</label>
                <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>SKU</label>
                <input className={inputCls + " font-mono"} value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Sub Category</label>
                <input className={inputCls} placeholder="e.g. PCOS Management" value={form.sub_category} onChange={(e) => setForm({ ...form, sub_category: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Pack Size</label>
                <input className={inputCls} value={form.pack_size} onChange={(e) => setForm({ ...form, pack_size: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Indication</label>
                <input className={inputCls} value={form.indication} onChange={(e) => setForm({ ...form, indication: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#384a72" }}>Details</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Description</label>
                <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Composition</label>
                <textarea className={inputCls} rows={3} value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>
                  Specification
                  <span className="normal-case font-normal text-gray-400 ml-1">(one ingredient per line)</span>
                </label>
                <textarea
                  className={inputCls}
                  rows={5}
                  placeholder={"Ingredient 1: 100mg\nIngredient 2: 200mg\n..."}
                  value={form.specification}
                  onChange={(e) => setForm({ ...form, specification: e.target.value })}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right: image + save */}
        <div className="space-y-5">

          {/* Image card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: "#384a72" }}>Product Image</h3>
            {id && (
              <p className="text-xs text-gray-400 mb-3">Leave empty to keep current image</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white cursor-pointer"
              style={{ "--file-bg": "#4e897d" }}
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            {form.image && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-100"
                />
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
            style={{ backgroundColor: "#4e897d" }}
          >
            {id ? "Update Product" : "Save Product"}
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}
