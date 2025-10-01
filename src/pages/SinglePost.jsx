import React from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useGetSinglePostQuery } from "../store/services/postApi";
import Loading from "../components/Loading";

function SinglePost() {
  
  // URL parameters se ID nikalna. (Agar route mein naam 'id' hai, toh yeh theek hai)
  const { id } = useParams();

  // RTK Query hook call
  const { data, isLoading, isError, error } = useGetSinglePostQuery(id);

  // --- 1. Loading State Check ---
  if (isLoading) {
    return <Loading />;
  }

  // --- 2. Error State Check ---
  if (isError) {
    // API se aayi hui error message ya generic message show karein
    const errorMessage = error?.data?.message || "Failed to load post.";
    return (
      <div className="alert alert-error shadow-lg max-w-lg mx-auto mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error: {errorMessage}</span>
      </div>
    );
  }
  
  // --- 3. Data Extraction and Null Check (Crucial for preventing crash) ---
  const post = data?.post; 
  
  if (!post) {
    // Agar API successful response de par 'post' object empty ho (e.g., ID invalid)
    return <div className="text-center p-10 text-xl">Post not found.</div>;
  }
  
  // 4. Data Mapping
  const postTitle = post?.title || "Untitled Post"; // Content ko Title maan rahe hain
  const postImage = post?.postimage || "https://via.placeholder.com/600x300"; 
  // Assuming 'content' field mein post body/description hai

  return (
    <div className="p-6 space-y-8">
      {/* Post Section - Use REAL Data */}
      <div className="card bg-base-100 shadow-xl">
        <figure>
          {/* Use mapped image variable */}
          <img 
            src={postImage} 
            alt={postTitle} 
            className="w-full h-64 object-cover" 
          />
        </figure>
        <div className="card-body">
          {/* Use mapped title variable */}
          <h2 className="card-title text-2xl font-bold">{postTitle}</h2>
          
          {/* Optional: Show Category/Author */}
          <p className="text-sm text-gray-500">
            Category: {post.category?.name || 'General'}
          </p>

          {/* Post Content/Description */}
          <p className="text-gray-600 mt-2">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Comments</h3>
        
        {/* CommentForm aur CommentList ko post ID pass karein */}
        <CommentForm postId={post._id} />

        <CommentList postId={post._id} />
      </div>
    </div>
  );
}

export default SinglePost;