import React from "react";
import { Link } from "react-router-dom";
import { useGetPostQuery } from "../store/services/postApi";
import Loading from "./Loading";
import { useSearch } from "../context/SearchContext";
import { useCategory } from "../context/CategoryContext";

function PostCard() {
  const { data, isLoading } = useGetPostQuery();
  const { searchQuery } = useSearch();
  const {selectCategory} = useCategory();

  if (isLoading) return <Loading />;

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-600">❌ Post Not Found</h2>
        <p className="text-gray-500 mt-2">
          Currently, there are no posts available. Please check back later.
        </p>
      </div>
    );
  }

 const filterPost = data?.data.filter((post) => {
    const matchesSearch = searchQuery === "" 
      ? true 
      : post.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectCategory === "All"
        ? true
        : post.category?.name === selectCategory;

    return matchesSearch && matchesCategory;
  });


  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">✨ Recent Posts</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterPost?.slice()?.reverse()?.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Image hover zoom */}
            <figure className="relative h-48 w-full overflow-hidden">
              <img
                src={post?.postimage}
                alt={post?.title}
                className="object-cover w-full h-full rounded-t-xl transform transition-transform duration-500 hover:scale-110"
              />
              {post.category?.name && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {post.category.name}
                </span>
              )}
            </figure>

            <div className="card-body p-5">
              <h2 className="card-title text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {post?.content?.length > 100
                  ? post.content.slice(0, 50) + "..."
                  : post?.content}
              </p>

              <div className="flex items-center mt-4">
                <img
                  src={post.author?.profileImage}
                  alt={post.author?.name}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 font-medium">
                  {post.author?.name}
                </span>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-sm rounded-full px-5 bg-primary text-white hover:bg-primary/80 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
