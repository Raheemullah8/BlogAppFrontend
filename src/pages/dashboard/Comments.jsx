import React from "react";
import { useGetAllCommentQuery } from "../../store/services/commentApi";

function Comments() {
  const { data, isLoading, isError } = useGetAllCommentQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium p-4">
        Failed to load comments.
      </div>
    );
  }

  if (!data?.comments || data.comments.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium p-6">
        No comments yet.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {data.comments.map((comment) => (
          <div key={comment._id} className="card bg-base-100 shadow-md">
            <div className="card-body p-4 flex flex-row items-start gap-3">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={
                      comment?.author?.profileImage ||
                      "https://i.pravatar.cc/40?img=12"
                    }
                    alt={comment?.author?.name || "User"}
                  />
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {comment?.author?.name || "Anonymous"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{comment?.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
