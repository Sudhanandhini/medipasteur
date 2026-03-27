import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/footer-icon.png";

const NAV_ITEMS = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: "linear-gradient(180deg, #1a3a4a 0%, #1e4d3f 100%)" }}>

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <img src={logo} alt="MediPasteur" className="h-12 w-auto" />
          <p className="text-white/40 text-xs mt-1 font-medium tracking-widest uppercase">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">Menu</p>
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/55 hover:text-white hover:bg-white/10"
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#4e897d", boxShadow: "0 4px 12px rgba(78,137,125,0.4)" } : {}
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user info + logout */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#4e897d" }}>
              A
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Admin</p>
              <p className="text-white/40 text-[10px]">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white/55 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm font-semibold text-gray-700">MediPasteur Admin</span>
          </div>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: "#4e897d" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Website
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
