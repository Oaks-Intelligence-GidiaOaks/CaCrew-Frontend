import { BROADCAST } from "services/constants";
import apiSlice from "./api/apiSlice";

export const broadcastApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all broadcast data
    getBroadcast: builder.query({
      providesTags: ["Broadcast"],
      query: ({ page = 1, search = null }) => ({
        url: `${BROADCAST}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetBroadcastQuery } = broadcastApiSlice;
