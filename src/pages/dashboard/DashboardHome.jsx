import React from "react";
import { Users, FileText, MessageSquare, Folder } from "lucide-react";

function DashboardHome() {
  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="stat bg-base-200 rounded-xl shadow-md">
          <div className="stat-figure text-primary">
            <Users size={32} />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value">120</div>
          <div className="stat-desc">+12 new this month</div>
        </div>

        {/* Total Posts */}
        <div className="stat bg-base-200 rounded-xl shadow-md">
          <div className="stat-figure text-secondary">
            <FileText size={32} />
          </div>
          <div className="stat-title">Total Posts</div>
          <div className="stat-value">350</div>
          <div className="stat-desc">+25 new this week</div>
        </div>

        {/* Total Comments */}
        <div className="stat bg-base-200 rounded-xl shadow-md">
          <div className="stat-figure text-accent">
            <MessageSquare size={32} />
          </div>
          <div className="stat-title">Total Comments</div>
          <div className="stat-value">980</div>
          <div className="stat-desc">+210 new this week</div>
        </div>

        {/* Total Categories */}
        <div className="stat bg-base-200 rounded-xl shadow-md">
          <div className="stat-figure text-info">
            <Folder size={32} />
          </div>
          <div className="stat-title">Categories</div>
          <div className="stat-value">18</div>
          <div className="stat-desc">2 new this month</div>
        </div>
      </div>

      {/* Extra Section */}
      <div className="bg-base-200 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Welcome back, Admin 👋</h2>
        <p>
          Here’s a quick snapshot of your platform’s activity. Keep track of
          users, posts, comments, and categories all in one place.
        </p>
      </div>
    </div>
  );
}

export default DashboardHome;
