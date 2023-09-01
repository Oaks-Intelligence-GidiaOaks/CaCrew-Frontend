import {
  GETUSER,
  LOGIN,
  REGISTER,
  UPDATE_USER_PASSWORD,
} from "services/constants";
import apiSlice from "./api/apiSlice";
import { updateUser } from "redux/slices/user.slice";
import { io } from "socket.io-client";
import { openModal } from "redux/slices/modal.slice";
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
      invalidatesTags: [
        "User",
        "Staff",
        "Organization",
        "Projects",
        "Transaction",
        "Message",
        "Document",
        "Registry",
      ],
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
      query: ({ data }) => ({
        url: "superAdmin/send_carbon_credits",
        body: data,
        method: "POST",
      }),
      transformResponse: (response) => {
        return response;
      },
      async onCacheEntryAdded(
        { id },
        { cacheDataLoaded, updateCacheData, dispatch }
      ) {
        // Wait for the initial data to be fetched
        await cacheDataLoaded;

        // Create a socket instance and connect to the server
        // const socket = io("http://localhost:5000");
        const socket = io("https://carbonible-46cc019868d0.herokuapp.com");

        socket.on("connect", () => {
          socket.emit("join", id);
        });

        // Listen for message events from the server
        socket.on("sentStaus", (data) => {
          console.log(data, "sendDDt");

          data?.status
            ? dispatch(
                openModal({
                  title: "Carbon Credited Successful",
                  message: `${data?.info}`,
                  success: true,
                })
              )
            : dispatch(
                openModal({
                  title: "Carbon Credited Failed",
                  message: `${data?.info}`,
                  success: false,
                })
              );
        });

        console.log(socket.hasListeners("sentsuccessful"), "lis");

        // Return a cleanup function that will be called when the cache entry is removed
        return () => {
          // Disconnect the socket
          socket.disconnect();
        };
      },
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

    // update user route
    updateUser: builder.mutation({
      query: (data) => ({
        url: GETUSER,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update user password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: UPDATE_USER_PASSWORD,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
  // overrideExisting: true,
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSendCreditMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = userApiSlice;
