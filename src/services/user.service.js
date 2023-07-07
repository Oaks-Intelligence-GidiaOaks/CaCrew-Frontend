import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import { GETUSER, LOGIN, REGISTER } from "services/constants";
import { REHYDRATE } from "redux-persist";
// import { SkipToken } from "@reduxjs/toolkit/dist/query";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroment.API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    addTagTypes: "User",
    // Login users route
    loginUser: builder.mutation({
      // providesTags: ["User"],
      query: (userData) => ({
        url: LOGIN,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => {
        console.log(response, "rtk");
        const { accessToken, user } = response;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
        return user;
      },
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response) => {
        if (response) {
          return response;
        }
      },
    }),

    // Get user route
    getUser: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET",
      }),
      transformErrorResponse: (response) => {
        if (response) {
          return response;
        }
      },
    }),
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
} = userApi;
