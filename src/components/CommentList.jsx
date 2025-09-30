import React from "react";
import { useGetCommentQuery } from "../store/services/commentApi";
import { useDeleteCommentMutation } from "../store/services/commentApi";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function CommentList({ postId }) {
  const { data: comment, isLoading } = useGetCommentQuery(postId);
  const [deleteCategory,{isLoading:isDeleting}] = useDeleteCommentMutation()
  const user = useSelector((state) => state.auth.user)
 

  if (isLoading) return <Loading />;
  const handleDelete = async (id) =>{
   try {
    const res = await deleteCategory(id).unwrap()
    toast.success(res.message||"comment Delete Successfull")
   } catch (error) {
    toast.error(error.message||"server error")
   }
  }

  return (
    <div className="space-y-4">
      {comment?.comments?.map((c) => (
        <div
          key={c._id}
          className="flex gap-3 items-start p-3 bg-base-200 rounded-lg"
        >
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={c?.author?.profileImage} alt={c?.author?.name} />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold">{c?.author?.name}</p>
            <p className="text-gray-600">{c?.content}</p>
          </div>
          {/* Delete Button UI */}
                    {user && c?.author?._id === user?._id && (
            <button
              className="btn btn-sm btn-error"
              disabled={isDeleting}
              onClick={() => handleDelete(c._id)}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}

        </div>
      ))}
    </div>
  );
}

export default CommentList;
