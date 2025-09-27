
import React from "react";
import { Link } from "react-router-dom";


const posts = [
  {
    id: 1,
    title: "Stylish Shoes",
    description: "Comfortable and trendy shoes for everyday wear.",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id: 2,
    title: "Smart Laptop",
    description: "Lightweight laptop with powerful performance.",
    image:
      "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    description: "Enjoy music with noise cancellation technology.",
    image:
      "https://img.daisyui.com/images/stock/photo-1570295999919-56ceb5ecca61.webp",
  },
  {
    id: 4,
    title: "Modern Watch",
    description: "Keep track of time with style and elegance.",
    image:
      "https://img.daisyui.com/images/stock/photo-1503602642458-232111445657.webp",
  },
];

function PostCard() {
  
  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">✨ Recent Posts</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Image hover zoom */}
            <figure className="relative h-48 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full rounded-t-xl transform transition-transform duration-500 hover:scale-110"
              />
            </figure>

            <div className="card-body p-5">
              <h2 className="card-title text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.description}</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm rounded-full px-5 bg-primary text-white hover:bg-primary/80 transition-colors">
                  <Link to={`/post/${post.id}`}>Read More</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
