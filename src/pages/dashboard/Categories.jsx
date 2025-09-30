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
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  // Track deleting state per category
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [updatingIds, setUpdatingIds] = useState(new Set());

  if (isLoading) return <Loading />;

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="p-10 text-center space-y-3">
        <h2 className="text-xl font-bold text-gray-600">No Categories Found</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Category
        </button>
        <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }

  const handleDelete = async (id) => {
    setDeletingIds(prev => new Set(prev).add(id)); // ✅ Mark this category as deleting
    try {
      const res = await deleteCategory(id).unwrap();
      toast.success(res.message || "Category Deleted Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id); // ✅ Remove deleting state
        return newSet;
      });
    }
  };

  const handleUpdate = async (id, oldName) => {
    const newName = prompt("Enter new Category name", oldName);
    if (!newName || newName.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    setUpdatingIds(prev => new Set(prev).add(id)); // ✅ Mark as updating
    try {
      const res = await updateCategory({ id, formdata: { name: newName } }).unwrap();
      toast.success(res.message || "Category Updated Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id); // ✅ Remove updating state
        return newSet;
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Categories</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Category
        </button>
      </div>

      {/* Table for md+ */}
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
            {data.data.map((cat, i) => (
              <tr key={cat._id}>
                <td>{i + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(cat._id, cat.name)}
                      disabled={updatingIds.has(cat._id)}
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <FaEdit /> {updatingIds.has(cat._id) ? "Updating..." : "Update"}
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      disabled={deletingIds.has(cat._id)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <FaTrash /> {deletingIds.has(cat._id) ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.data.map((cat, i) => (
          <div key={cat._id} className="card bg-base-200 shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">
                {i + 1}. {cat.name}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(cat._id, cat.name)}
                disabled={updatingIds.has(cat._id)}
                className="btn btn-sm btn-warning flex items-center gap-1"
              >
                <FaEdit /> {updatingIds.has(cat._id) ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                disabled={deletingIds.has(cat._id)}
                className="btn btn-sm btn-error flex items-center gap-1"
              >
                <FaTrash /> {deletingIds.has(cat._id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Categories;
