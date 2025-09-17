import React from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";


function SinglePost() {
  const { id } = useParams();

  // Dummy post data (API se ayega normally)
  const post = {
    id,
    title: "Understanding React Hooks",
    desc: "React hooks let you use state and lifecycle features without writing a class...",
    image: "https://via.placeholder.com/600x300",
  };

  return (
    <div className="p-6 space-y-8">
      {/* Post Section */}
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.desc}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comments</h3>
        
        {/* Comment Form */}
        <CommentForm />

        {/* Comment List */}
        <CommentList />
      </div>
    </div>
  );
}

export default SinglePost;
