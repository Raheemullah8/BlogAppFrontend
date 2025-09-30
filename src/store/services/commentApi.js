import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://blog-app-backend-daxumuas6-raheemullah8s-projects-adbcc6f8.vercel.app/api",
    }),
    tagTypes: ["Comment"],
    endpoints: (builder) => ({
     createComment: builder.mutation({
  query: ({ postId, content }) => ({
    url: `/comment/createcomment/${postId}`, // <- postId url me dalna hai
    method: "POST",
    body: { content }, // <- backend ko content bhejna hai
    credentials: "include",
  }),
  invalidatesTags: ["Comment"],
}),
 getComment: builder.query({
    query:(postID) =>({
        url:`/comment/getcomment/${postID}`,
        method: "GET",
    credentials: "include",
    }),
    providesTags:["Comment"]
 }),
  getAllComment: builder.query({
    query:() =>({
        url:'/comment/getallcomment',
        method: "GET",
    credentials: "include",
    }),
    providesTags:["Comment"]
 }),
 deleteComment: builder.mutation({
  query: (commentid) => ({
    url: `/comment/deletecomment/${commentid}`,
    method: "DELETE",
    credentials: "include",
  }),
  invalidatesTags: ["Comment"],
}),


    }),
});

export const { useCreateCommentMutation,useGetCommentQuery,useDeleteCommentMutation,useGetAllCommentQuery} = commentApi;