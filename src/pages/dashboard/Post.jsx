import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import PostModal from "../../components/PostModal";
import { useGetPostQuery } from "../../store/services/postApi";
import Loading from "../../components/Loading";


function Post() {
  const { data, isLoading } = useGetPostQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Loading State Check (already present)
  if (isLoading) {
    return <Loading />
  }

  // Simplify data access and check for empty state
  const posts = data?.data || [];
  const noPosts = posts.length === 0;
  const HandelDelete = async (id) =>{
    alert(id)

  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Post
        </button>
      </div>

      {/* 2. No Posts Found Message */}
      {noPosts ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>No posts found. Click "+ Add Post" to create a new one!</span>
          </div>
        </div>
      ) : (
        <>
          {/* Table Section for md+ screens */}
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
                      onClick={()=>HandelDelete(post?._id)}
                       className="btn btn-sm btn-error flex items-center gap-1">
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card/List view for mobile */}
          <div className="md:hidden space-y-4">
            {posts.map((post) => (
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
                onClick={()=>HandelDelete(post?._id)}
                className="btn btn-sm btn-error flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}


      {/* Modal */}
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Post;