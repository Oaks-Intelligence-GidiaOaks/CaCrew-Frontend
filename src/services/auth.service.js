import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import { LOGIN, REGISTER } from "services/constants";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroment.API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login users route
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => {
        if (response) {
          //   return response.token;
          console.log(response.data, "rtk");
        } else {
          throw new Error(response.message);
        }
      },
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
