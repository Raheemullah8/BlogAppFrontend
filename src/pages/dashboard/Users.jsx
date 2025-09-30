import React from "react";
import { FaTrash } from "react-icons/fa";
import { useGetUsersQuery, useDeleteUserMutation } from "../../store/services/authApi";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/ErrorPage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Users() {
  const { data, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
        refetch();
        navigate("/admin/users");
      } catch (err) {
        const errorMessage =
          err?.data?.message || "Failed to delete user. Please try again.";
        toast.error(errorMessage);
        console.error("Deletion error:", err);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorPage
        message={
          error.status
            ? `Failed to load users. Status: ${error.status}`
            : "Failed to load users."
        }
        code={error.status || 500}
      />
    );
  }

  // ✅ Agar koi user hi nahi hai
  if (!data?.users || data.users.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-gray-600">No Users Found</h2>
      </div>
    );
  }

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
            {data.users.map((user, i) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={user?.profileImage} alt={user?.name} />
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={isDeleting}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrash /> {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Section for Mobile */}
      <div className="md:hidden space-y-4">
        {data.users.map((user) => (
          <div
            key={user?._id}
            className="card bg-base-200 shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={user?.profileImage} alt={user?.name} />
                </div>
              </div>
              <div>
                <h3 className="font-bold">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              disabled={isDeleting}
              className="btn btn-sm btn-error flex items-center gap-1"
            >
              <FaTrash /> {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
