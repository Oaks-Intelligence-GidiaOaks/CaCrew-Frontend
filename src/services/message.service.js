import { MESSAGE, MARK_AS_READ } from "services/constants";
import apiSlice from "./api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all messages
    getAllMessages: builder.query({
      providesTags: ["Message"],
      query: () => ({
        url: MESSAGE,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // get messages
    getMessage: builder.query({
      providesTags: ["Message"],
      query: (id) => ({
        url: `${MESSAGE}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // send message
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    // mark message read
    markAsRead: builder.mutation({
      query: (data) => ({
        url: `${MARK_AS_READ}/${data}`,
        method: "PUT",
        // body: data.body,
      }),
      invalidatesTags: ["Message"],
    }),
  }),
  //   refetchOnMountOrArgChange: true,
});

export const {
  useGetAllMessagesQuery,
  useMarkAsReadMutation,
  useSendMessageMutation,
  useGetMessageQuery,
} = messageApiSlice;
