import { GET_NOTIFICATION } from "services/constants";
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
  }),
});

export const { useGetNotificationQuery } = notificationApiSlice;
