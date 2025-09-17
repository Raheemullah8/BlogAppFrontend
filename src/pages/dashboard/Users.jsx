import React from "react";
import { FaTrash } from "react-icons/fa";

function Users() {
  const users = [
    {
      id: 1,
      username: "JohnDoe",
      email: "john@example.com",
      profile: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      username: "JaneSmith",
      email: "jane@example.com",
      profile: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Users</h2>
      </div>

      {/* Table Section for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={user.profile} alt={user.username} />
                    </div>
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-sm btn-error flex items-center gap-1">
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Section for Mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="card bg-base-200 shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={user.profile} alt={user.username} />
                </div>
              </div>
              <div>
                <h3 className="font-bold">{user.username}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <button className="btn btn-sm btn-error flex items-center gap-1">
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
