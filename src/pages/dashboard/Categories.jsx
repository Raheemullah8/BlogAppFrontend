import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CategoryModal from "../../components/CategoryModal";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../store/services/categoryApi";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetCategoryQuery();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  if (isLoading) {
    return <Loading />;
  }

  // ✅ Agar koi category hi nahi hai
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="p-10 text-center space-y-3">
        <h2 className="text-xl font-bold text-gray-600">No Categories Found</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Category
        </button>

        {/* Modal Component */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res.message || "Category Deleted Successfully");
      refetch(); // ✅ list update hogi
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  const handleUpdate = async (id, oldName) => {
    const newName = prompt("Enter new Category name", oldName);
    if (!newName || newName.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const res = await updateCategory({
        id,
        formdata: { name: newName },
      }).unwrap();
      toast.success(res.message || "Category Updated Successfully");
      refetch(); // ✅ list update hogi
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Categories</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Category
        </button>
      </div>

      {/* Table Section for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((cat, i) => (
              <tr key={cat._id}>
                <td>{i + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(cat._id, cat.name)}
                      disabled={isUpdating}
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <FaEdit /> {isUpdating ? "Updating..." : "Update"}
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      disabled={isDeleting}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <FaTrash /> {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card/List view for mobile */}
      <div className="md:hidden space-y-4">
        {data?.data?.map((cat, i) => (
          <div
            key={cat._id}
            className="card bg-base-200 shadow p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">
                {i + 1}. {cat?.name}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(cat._id, cat.name)}
                disabled={isUpdating}
                className="btn btn-sm btn-warning flex items-center gap-1"
              >
                <FaEdit /> {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                disabled={isDeleting}
                className="btn btn-sm btn-error flex items-center gap-1"
              >
                <FaTrash /> {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Categories;
