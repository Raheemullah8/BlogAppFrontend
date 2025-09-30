import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import PostModal from "../../components/PostModal";
import { useGetPostQuery, useDeletePostMutation } from "../../store/services/postApi";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";

function Post() {
  const { data, isLoading } = useGetPostQuery();
  const [deletePost] = useDeletePostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track deleting state per post
  const [deletingIds, setDeletingIds] = useState(new Set());

  if (isLoading) return <Loading />;

  const posts = data?.data || [];
  const noPosts = posts.length === 0;

  const handleDelete = async (id) => {
    setDeletingIds(prev => new Set(prev).add(id));
    try {
      const res = await deletePost(id).unwrap();
      toast.success(res.message || "Post Deleted Successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Post
        </button>
      </div>

      {noPosts ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <span>No posts found. Click "+ Add Post" to create a new one!</span>
          </div>
        </div>
      ) : (
        <>
          {/* Table for md+ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="w-12 h-12 rounded">
                          <img src={post?.postimage} alt={post.content} />
                        </div>
                      </div>
                    </td>
                    <td>{post?.content}</td>
                    <td>{post?.category?.name}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingIds.has(post._id)}
                        className="btn btn-sm btn-error flex items-center gap-1"
                      >
                        <FaTrash /> {deletingIds.has(post._id) ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {posts.map((post, i) => (
              <div
                key={post._id}
                className="card bg-base-200 shadow p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="avatar">
                  <div className="w-16 h-16 rounded">
                    <img src={post?.postimage} alt={post?.content} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{post.content}</h3>
                  <p className="text-sm text-gray-500">{post.category.name}</p>
                </div>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingIds.has(post._id)}
                  className="btn btn-sm btn-error flex items-center gap-1"
                >
                  <FaTrash /> {deletingIds.has(post._id) ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Post;
