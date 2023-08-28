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
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
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

            apiSlice.util.updateQueryData("getMessage", id, (draft) => {
              // append the new message to the end of the array
              // console.log([{ ...event }, ...draft], "evn");
              // console.log(event, "evn");
              // return [{ ...event }, ...draft];
              alert("Hi")
              Object.assign(draft, event);
            });

            // res();

            // updateCachedData((draft) => {
            // console.log([{ ...event }, ...draft], "evn");
            // return [{...event}, ...draft];
            // });
            // use api.util.updateQueryData to update the cache data for getMessages endpoint
          };

          ws.on("newMessage", listener);
        } catch (error) {
          // res.undo()
        }
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
      query: (id) => ({
        url: `${MARK_AS_READ}/${id}`,
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
