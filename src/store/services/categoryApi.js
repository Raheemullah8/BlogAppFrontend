import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category/createcategory",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ['Category']
        }),
        getCategory: builder.query({
            query: () => ({
                url: "/category/getcategory",
                method: "GET",
                credentials: "include", // 👈 ye zaroori hai
            }),
            providesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
  query: (id) => ({
    url: `/category/deletecategory/${id}`,  // slash add karo
    method: "DELETE",
    credentials: "include", // agar auth required hai
  }),
  invalidatesTags: ["Category"],
})


    })
});

export const { useCreateCategoryMutation, useGetCategoryQuery,useDeleteCategoryMutation } = categoryApi;
