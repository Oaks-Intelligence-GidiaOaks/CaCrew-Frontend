import { MESSAGE, MARK_AS_READ } from "services/constants";
import apiSlice from "./api/apiSlice";
import { io } from "socket.io-client";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all messages
    getAllMessages: builder.query({
      providesTags: ["Message"],
      query: ({ id = " " }) => ({
        url: MESSAGE,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // const ws = io("https://carbonible-46cc019868d0.herokuapp.com");
        const ws = io("http://localhost:5000");
        // console.log(arg.id, "id")

        ws.on("connect", () => {
          // console.log(arg, "Connected to Webws server");
          ws.emit("join", arg.id);
        });

        // ws.on("newMessage", (notification) => {
        //   alert("hi");

        //   // Dispatch an action to update the global state (Redux)
        //   // dispatch({ type: "ADD_NOTIFICATION", payload: notification });
        //   console.log(notification, "Connected to Webws server");
        // });

        try {
          await cacheDataLoaded;

          const listener = (event) => {
            // const data = JSON.parse(event);
            // console.log(data, "data");
            // if (data.channel !== arg) return;
            console.log(event, "draft");

            updateCachedData((draft) => {
              console.log(draft, "draft");
              alert("hi");
              draft.push(event);
            });
          };

          ws.addEventListener("newMessage", listener);
        } catch (error) {}
        await cacheEntryRemoved;
        ws.close();
      },
      // transformResponse: (response) => {
      //   return response;
      // },
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
