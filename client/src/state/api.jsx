import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/',
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Loans",
    "Dashboard",
    "formData",
    "Roles",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    //client
    getLoans: build.query({
      query: ({ id }) => ({
        url: `client/loans`,
        method: "GET",
        params: { id },
      }),
      providesTags: ["Loans"],
    }),
    // Submitting form data
    submitFormData: build.mutation({
      query: (formData) => ({
        url: `client/submit`, 
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["formData"],
    }),
 
    getUserRole: build.query({
      query:({ id })=>({
        url: `client/roles`,
        method: "GET",
        params: { id },
      }),
      providesTags: ["Roles"],
    }),

    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    
  }),
});

export const {
  useGetUserQuery,
  useGetUserRoleQuery,
  useGetLoansQuery,
  useGetDashboardQuery,
  useSubmitFormDataMutation,
} = api;