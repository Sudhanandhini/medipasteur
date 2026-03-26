import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products/1");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <button onClick={() => { setOpen(true); setSelected(null); }} className="bg-green-600 text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>SKU</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border">
              <td>{p.name}</td>
              <td>{p.sku}</td>

              <td>
                {p.image && (
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    className="w-12 h-12 object-cover"
                  />
                )}
              </td>

              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setSelected(p);
                    setOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <ProductForm
          selected={selected}
          refresh={fetchProducts}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
}