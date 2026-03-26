import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="space-y-3">
          {/* <Link to="/admin/dashboard">Dashboard</Link> */}
          <Link to="/admin/products">Products</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}