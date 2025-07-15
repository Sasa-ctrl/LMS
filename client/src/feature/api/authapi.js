import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedin } from "../authslicer";

const auth_url = "http://localhost:8080/regapi/";

export const authapi = createApi({
  reducerPath: "authapi",
  baseQuery: fetchBaseQuery({
    baseUrl: auth_url,
    credentials: 'include' // Enables cookies
  }),
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (inputdata) => ({
        url: "register",
        method: "POST",
        body: inputdata
      })
    }),

    loginUser: builder.mutation({
      query: (inputdata) => ({
        url: "login",
        method: "POST",
        body: inputdata
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({ user: result.data.user }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      }
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET"
      })
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET"
      }),
       async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedin({ user: result.data.user }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      }
    }),

    updateUser: builder.mutation({
      query: (formdata) => ({
        url: "profile/update",
        method: "PUT",
        body: formdata,
        credentials:"include"
      })
    })
  })
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation
} = authapi;
