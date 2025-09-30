import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_APIURL,
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
}),
updateCategory: builder.mutation({
  query: ({ id, formdata }) => ({
    url: `/category/updatecategory/${id}`, // ✅ backend route theek hona chahiye
    method: "PATCH",
    body: formdata, // ✅ agar JSON bhejna hai to object hi chalega
    credentials: "include", // ✅ cookie/session ke liye
  }),
  invalidatesTags: ["Category"],
})



    })
});

export const { useCreateCategoryMutation, useGetCategoryQuery,useDeleteCategoryMutation,useUpdateCategoryMutation} = categoryApi;
