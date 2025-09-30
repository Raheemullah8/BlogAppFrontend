import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
  baseUrl: "https://blog-app-backend-bofwh90s4-raheemullah8s-projects-adbcc6f8.vercel.app/api",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({

    getPost: builder.query({
      query: () => "/post/getallpost",
      providesTags: ["Post"],
    }),

    // 🔹 Create Post
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/post/createpost",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),

    getSinglePost: builder.query({
      // Query function ko object return karna hoga
      query: (id) => ({
        url: `/post/getsinglepost/${id}`,
        method: "GET",
        // 🔑 Ye line browser ko cookie store se token utha kar request me dalne ko kehti hai
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/deletepost/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),

  }),
});

// ✅ Export the new hook: useGetSinglePostQuery
export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetSinglePostQuery, // <-- NEW/CORRECTED HOOK
  useDeletePostMutation
} = postApi;