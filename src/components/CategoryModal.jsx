import React from "react";
import { useForm } from "react-hook-form";
import { useCreateCategoryMutation } from "../store/services/categoryApi";
import toast from "react-hot-toast";

function CategoryModal({ isOpen, onClose, onSave }) {
 const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Form submit handler
  const onSubmit = (data) => {
    // Save category data (you can connect API later)
    createCategory(data);
    toast.success(data.message || "Category Create Successfull")
    if (onSave) {
      onSave(data);
    }
    reset(); // reset form after submit
    onClose(); // close modal
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Category</h3>

            {/* Category Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
                {...register("name", { required: "Category name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryModal;
