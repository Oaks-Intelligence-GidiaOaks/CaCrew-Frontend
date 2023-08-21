import { GET_REGISTRY, GET_REGISTRY_COUNT } from "services/constants";
import apiSlice from "./api/apiSlice";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all registry data
    getRegistry: builder.query({
      providesTags: ["Registry"],
      query: () => ({
        url: GET_REGISTRY,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Get registry detail with id
    getRegistryCount: builder.query({
      query: (id) => ({
        url: `${GET_REGISTRY_COUNT}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRegistryQuery, useGetRegistryCountQuery } = staffApiSlice;
