import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 min-h-screen p-4">
        <ul className="menu">
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/posts">Manage Posts</Link></li>
          <li><Link to="/admin/category">Manage category</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
