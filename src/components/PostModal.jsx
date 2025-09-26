import React from "react";
import { useForm } from "react-hook-form";
import { useGetCategoryQuery } from "../store/services/categoryApi";
import { useCreatePostMutation } from "../store/services/postApi";
import toast from "react-hot-toast";

function PostModal({ isOpen, onClose, onSubmitPost }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const { data: categories, isLoading } = useGetCategoryQuery();
  const [createPost, { isLoading: postLoading }] = useCreatePostMutation();

  // Image watch (preview ke liye)
  const imageFile = watch("image");

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    // 💡 Frontend field name changed from 'desc' to 'content' to match the backend
    data.append("content", formData.content); 
    data.append("category", formData.category);
    // 💡 'postimage' is the name of the file field expected by upload.single("postimage")
    data.append("postimage", formData.image[0]); 

    try {
      const res = await createPost(data).unwrap(); // Use .unwrap() to get the actual payload or throw an error
      // 💡 Assuming the successful response body is { error: false, message: "..." }
      toast.success(res.message || "Post created successfully!"); 
      
      if (onSubmitPost) onSubmitPost(res.newPost); // Pass the new post data back if needed
      reset();
      onClose();
    } catch (error) {
      console.error("Post creation failed:", error);
      // 💡 RTK Query errors are typically in the error object (e.g., error.data.message)
      toast.error(error.data?.message || "Failed to create post."); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Add New Post</h3>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
          </div>

          {/* Description - NOW 'content' */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter post description"
              // 💡 Field name is 'content'
              {...register("content", { required: true })} 
            ></textarea>
          </div>

          {/* Category Select */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: true })}
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              {categories?.data?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Post Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              {...register("image", { required: true })}
            />
          </div>

          {/* Preview */}
          {imageFile && imageFile.length > 0 && (
            <div className="mt-3">
              <p className="font-medium mb-2">Image Preview:</p>
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
                className="w-48 h-32 object-cover rounded"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={postLoading || isLoading}>
              {postLoading ? "Saving..." : "Save Post"}
            </button>
            <button type="button" className="btn" onClick={onClose} disabled={postLoading}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;