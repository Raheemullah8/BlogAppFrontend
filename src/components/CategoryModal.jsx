import React from "react";

function CategoryModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Category</h3>

            {/* Category Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button type="button" className="btn" onClick={onClose}>
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
