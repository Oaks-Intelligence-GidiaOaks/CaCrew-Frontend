import { MESSAGE, MARK_AS_READ } from "services/constants";
import apiSlice from "./api/apiSlice";
import { io } from "socket.io-client";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all messages
    getAllMessages: builder.query({
      providesTags: ["Message"],
      query: () => ({
        url: MESSAGE,
        method: "GET",
      }),
      // transformResponse: (response) => {
      //   return response;
      // },
      onCacheEntryAdded: async (
        id,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        // const ws = io("https://carbonible-46cc019868d0.herokuapp.com");
        const ws = io("http://localhost:5000");

        ws.on("connect", () => {
          ws.emit("join", id);
        });

        try {
          await cacheDataLoaded;

          const listener = (event) => {
            console.log(event, "evn");
            updateCachedData((draft) => {
              // return Array.from(draft).push(event)
              return [{...event}, ...draft];
            });
            // use api.util.updateQueryData to update the cache data for getMessages endpoint
            // apiSlice.util.updateQueryData("getAllMessages", arg, (draft) => {
            //   // append the new message to the end of the array
            //   draft.push(event);
            // });
          };

          ws.addEventListener("newMessage", listener);
        } catch (error) {}
        await cacheEntryRemoved;
        ws.close();
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
