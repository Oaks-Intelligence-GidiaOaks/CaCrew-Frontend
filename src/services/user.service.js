import { GETUSER, LOGIN, REGISTER } from "services/constants";
import apiSlice from "./api/apiSlice";
import { updateUser } from "redux/slices/user.slice";
// import { SkipToken } from "@reduxjs/toolkit/dist/query";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login users route
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        body: userData,
        method: "POST",
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, user } = data;

          dispatch(
            updateUser({
              token: accessToken,
              user,
              refreshToken: user.refreshToken,
            })
          );
        } catch (error) {
          // console.log(error);
          return;
        }
      },
      transformResponse: (response) => {
        console.log(response, "rtk");
        return response;
      },
      invalidatesTags: ["User", "Staff", "Organization", "Projects"],
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    // send credit
    sendCredit: builder.mutation({
      query: (data) => ({
        url: "superAdmin/send_carbon_credits",
        body: data,
        method: "POST",
      }),
      // invalidatesTags: ["User"],
    }),

    // Get user route
    getUser: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: true,
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSendCreditMutation,
  useGetUserQuery,
} = userApiSlice;
