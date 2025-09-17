import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/posts", label: "Manage Posts", icon: <FileText size={20} /> },
    { path: "/admin/category", label: "Manage Category", icon: <Folder size={20} /> },
    { path: "/admin/users", label: "Manage Users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden md:flex ${
          collapsed ? "w-20" : "w-64"
        } bg-base-200 transition-all duration-300 flex-col border-r`}
      >
        {/* Top Title */}
        <div className="p-4 text-xl font-bold text-center border-b">
          {!collapsed && <Link to={"/"}>Admin Panel</Link>}
        </div>

        {/* Collapse Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-ghost btn-sm"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu */}
        <ul className="menu p-2 flex-1 space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 text-lg ${
                  location.pathname === item.path ? "active font-semibold" : ""
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-base-200 flex flex-col border-r">
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-bold text-xl">Admin Panel</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn btn-ghost btn-sm"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="menu p-2 flex-1 space-y-4">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 text-lg ${
                      location.pathname === item.path ? "active font-semibold" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="md:hidden flex items-center justify-between bg-base-200 p-4 border-b">
          <button
            onClick={() => setMobileOpen(true)}
            className="btn btn-ghost btn-sm"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-lg">Admin Panel</span>
          <div className="w-8" /> {/* spacer */}
        </div>

        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
