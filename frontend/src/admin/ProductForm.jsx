import { useState, useEffect } from "react";

export default function ProductForm({ selected, refresh, close }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    const url = selected
      ? `http://localhost:5000/api/products/${selected.id}`
      : `http://localhost:5000/api/products`;

    const method = selected ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { Authorization: token },
      body: formData,
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
        <h2 className="font-bold text-lg">
          {selected ? "Edit Product" : "Add Product"}
        </h2>

        <input name="name" placeholder="Name" onChange={handleChange} value={form.name || ""} />
        <input name="sku" placeholder="SKU" onChange={handleChange} value={form.sku || ""} />
        <input name="sub_category" placeholder="Category" onChange={handleChange} value={form.sub_category || ""} />
        <input name="pack_size" placeholder="Pack Size" onChange={handleChange} value={form.pack_size || ""} />

        <input type="file" onChange={handleFile} />

        <button onClick={handleSubmit} className="bg-blue-600 text-white w-full py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}