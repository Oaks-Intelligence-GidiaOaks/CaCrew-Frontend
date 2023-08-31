import { MESSAGE, MARK_AS_READ } from "services/constants";
import apiSlice from "./api/apiSlice";
import { io } from "socket.io-client";
import { openModal } from "redux/slices/modal.slice";
import { updateMessageId } from "redux/slices/message.slice";

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
            // console.log(event, "evn");

            // dispatch(
            //   apiSlice.util.updateQueryData("getMessage", id, (draft) => {
            //     // append the new message to the end of the array
            //     // console.log([{ ...event }, ...draft], "evn");
            //     // return [{ ...event }, ...draft];
            //     Object.assign(draft, event);
            //   })
            // );

            // res();

            // update rtk cache
            updateCachedData((draft) => {
              draft[0].message.unshift(event);
              return draft;
            });
            // dispatch(updateMessageId({ refectch: true }));
            // use api.util.updateQueryData to update the cache data for getMessages endpoint
          };

          ws.on("newMessage", listener);
        } catch (error) {
          // res.undo()
        }
        // cleanup, close connection when cache is removed
        await cacheEntryRemoved;
        ws.close();
      },
    }),

    // get messages
    getMessage: builder.query({
      providesTags: ["Message"],
      query: ({ id }) => ({
        url: `${MESSAGE}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      onCacheEntryAdded: async (
        { userId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) => {
        const ws = io("https://carbonible-46cc019868d0.herokuapp.com");
        // const ws = io("http://localhost:5000");

        ws.on("connect", () => {
          ws.emit("join", userId);
        });

        try {
          await cacheDataLoaded;

          const listener = (event) => {
            console.log(event, "evn");

            // dispatch(
            //   apiSlice.util.updateQueryData("getMessage", id, (draft) => {
            //     // append the new message to the end of the array
            //     // console.log([{ ...event }, ...draft], "evn");
            //     // return [{ ...event }, ...draft];
            //     Object.assign(draft, event);
            //   })
            // );

            // res();

            updateCachedData((draft) => {
              // console.log([{ ...event }, ...draft], "evn");
              return [...draft, { ...event }];
            });
            // dispatch(updateMessageId({ refectch: true }));
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
