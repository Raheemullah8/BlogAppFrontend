// services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-app-backend-bofwh90s4-raheemullah8s-projects-adbcc6f8.vercel.app/api",
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
         credentials: "include",
      }),
    }),
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
         credentials: "include",
      })
    }),
    getUsers: builder.query({
      query: () => '/auth/getuser', // Specific path for this endpoint
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/deleteuser/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['User']
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include", // Include cookies in the request
      }),
    }),
    updateProfile: builder.mutation({
      query:({id, formData}) =>({
        url: `/auth/updateusers/${id}`,
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
    })


  }),



});

export const { useLoginUserMutation, useRegisterUserMutation, useDeleteUserMutation,useUpdateProfileMutation, useLogoutUserMutation, useGetUsersQuery } = authApi;
