import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
   
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({

    getPost: builder.query({
      query:() => "/post/getallpost",
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
     
  }),
});

// ✅ hooks export
export const { useCreatePostMutation,useGetPostQuery} = postApi;
