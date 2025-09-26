import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
   
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
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

   
      getAllPost: builder.query({
            query: () => ({
                url: "/post/getallpost",
                method: "GET",
               
            }),
            providesTags: ['Category'],
        }),
  }),
});

// ✅ hooks export
export const { useCreatePostMutation, useGetAllPostQuery } = postApi;
