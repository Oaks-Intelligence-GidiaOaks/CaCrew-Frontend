import { GET_NOTIFICATION, GET_NOTIFICATION_READ } from "services/constants";
import apiSlice from "./api/apiSlice";
import { io } from "socket.io-client";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all broadcast data
    getNotification: builder.query({
      providesTags: ["Notification"],
      query: ({ page = 1, search = null }) => ({
        url: `${GET_NOTIFICATION}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      onCacheEntryAdded: async (
        id,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) => {
        // connect to socket
        const ws = io("https://carbonible-46cc019868d0.herokuapp.com");
        // const ws = io("http://localhost:5000");

        // User id join connection
        ws.on("connect", () => {
          ws.emit("join", id);
        });

        try {
          // wait till cache is populated for first request
          await cacheDataLoaded;

          // set up listener callback for "newMessage" socket emit
          const listener = (event) => {
            // update rtk cache
            updateCachedData((draft) => {
              draft[0].message.unshift(event);
              return draft;
            });
          };

          ws.on("newNotification", listener);
        } catch (error) {
          // res.undo()
        }
        // cleanup, close connection when cache is removed
        await cacheEntryRemoved;
        ws.close();
      },
    }),

    markNotificationAsRead: builder.mutation({
      invalidatesTags: [{ type: "Notification", id: "LIST" }], // Invalidate the notification list
      query: ({ id }) => ({
        url: `${GET_NOTIFICATION_READ}/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useMarkNotificationAsReadMutation } =
  notificationApiSlice;
