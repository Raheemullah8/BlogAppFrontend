import React, { useState } from "react";
import { useCreateCommentMutation } from "../store/services/commentApi";
import toast from "react-hot-toast";


function CommentForm({ postId }) {
  const [createComment, { isLoading, error }] = useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await createComment({ postId, content: comment }).unwrap();
      
     
      setComment("");
      toast.success("Comment added successfully!");
    } catch (err) {
     toast.error(err.message||"server Error")
    }
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
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Comment"}
      </button>
      {error && <div className="text-red-500">Error adding comment.</div>}
    </form>
  );
}

export default CommentForm;
