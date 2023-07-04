import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import { ALL_ORGANISATION, VERIFY_ORGANISATION } from "services/constants";
import { REHYDRATE } from "redux-persist";

export const organisationApi = createApi({
  reducerPath: "organisations",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroment.API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo: (action, {reducerPath}) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    addTagTypes: "Organisation",
    // get all organisations route
    allOrganisation: builder.query({
      providesTags: ["Organisation"],
      query: () => ({
        url: ALL_ORGANISATION,
        method: "GET",
        // body: userData,
      }),
      transformResponse: (response) => {
        // console.log(response, "rtk");
        return response;
      },
    }),

    // Verify organisation
    verifyOrganisation: builder.mutation({
      query: (id) => ({
        url: `${VERIFY_ORGANISATION}${id}`,
        method: "PUT",
        // body: userData,
      }),
    }),
  }),
});

// const customApi = organisationApi.enhanceEndpoints({
//   addTagTypes: ["Organisation"],
//   endpoints: {
//     getOrganisation: {
//       providesTags: ["Organisation"],
//     },
//     updateOrganisation: {
//       invalidatesTags: ["Organisation"],
//     },
//   },
//   // this function will extract rehydration info from rehydrate actions
//   extractRehydrationInfo: (action) => {
//     if (action.type === REHYDRATE) {
//       return action.payload?.[customApi.reducerPath]?.queries;
//     }
//   },
//   // this option will keep unused data for 10 minutes before removing it
//   keepUnusedDataFor: 10,
// });

export const { useAllOrganisationQuery, useVerifyOrganisationMutation } =
  organisationApi;
