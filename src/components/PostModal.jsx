import React, { useState } from "react";

function PostModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", image);

    console.log("Post Submitted:", { title, desc, image });

    // Yahan API call karna hoga
    // await fetch("/api/posts", { method: "POST", body: formData })

    onClose(); // modal band karne ke liye
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Add New Post</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter post description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
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
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Preview */}
          {image && (
            <div className="mt-3">
              <p className="font-medium mb-2">Image Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-48 h-32 object-cover rounded"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save Post
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;
