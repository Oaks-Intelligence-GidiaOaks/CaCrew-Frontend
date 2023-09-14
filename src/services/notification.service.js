import { GET_NOTIFICATION, GET_NOTIFICATION_READ } from "services/constants";
import apiSlice from "./api/apiSlice";

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
