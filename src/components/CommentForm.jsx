import React, { useState } from "react";

function CommentForm() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Comment:", comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
}

export default CommentForm;
