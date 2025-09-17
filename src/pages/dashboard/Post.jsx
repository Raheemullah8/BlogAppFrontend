import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import PostModal from "../../components/PostModal";

function Post() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const posts = [
    {
      id: 1,
      title: "React Basics",
      category: "Programming",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Next.js Advanced",
      category: "Web Dev",
      image: "https://via.placeholder.com/150",
    },
  ];

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
              <tr key={post.id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded">
                      <img src={post.image} alt={post.title} />
                    </div>
                  </div>
                </td>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>
                  <button className="btn btn-sm btn-error flex items-center gap-1">
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
            key={post.id}
            className="card bg-base-200 shadow p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="avatar">
              <div className="w-16 h-16 rounded">
                <img src={post.image} alt={post.title} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.category}</p>
            </div>
            <button className="btn btn-sm btn-error flex items-center gap-1">
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Post;
