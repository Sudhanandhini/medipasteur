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
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/item/${id}`)
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
        ? `http://localhost:5000/api/products/${id}`
        : `http://localhost:5000/api/products`;

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

  const field = (label, key, type = "input") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ) : (
        <input
          className="w-full border p-2 rounded"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit Product" : "Add Product"}</h2>

      <div className="space-y-3">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full border p-2 rounded"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {field("Product Name", "name")}
        {field("SKU", "sku")}
        {field("Sub Category (e.g. PCOS Management)", "sub_category")}
        {field("Description", "description", "textarea")}
        {field("Composition", "composition", "textarea")}
        {field("Pack Size", "pack_size")}
        {field("Indication", "indication")}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specification
            <span className="text-gray-400 font-normal ml-1 text-xs">(e.g. Shatavari 200mg + Methi 200mg + ...)</span>
          </label>
          <textarea
            className="w-full border p-2 rounded"
            rows={5}
            placeholder={"Ingredient 1: 100mg\nIngredient 2: 200mg\n..."}
            value={form.specification}
            onChange={(e) => setForm({ ...form, specification: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            className="w-full"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Save Product
        </button>

      </div>
    </div>
  );
}
