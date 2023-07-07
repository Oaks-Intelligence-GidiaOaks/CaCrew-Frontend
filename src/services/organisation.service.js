import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import {
  UNVERIFIED_ORGANISATION,
  VERIFIED_ORGANISATION,
  VERIFY_ORGANISATION,
} from "services/constants";
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
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    addTagTypes: ["Organisation"],
    // get all organisations route
    unverifiedOrganisation: builder.query({
      providesTags: ["Organisation"],
      query: () => ({
        url: UNVERIFIED_ORGANISATION,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    verifiedOrganisation: builder.query({
      providesTags: ["Organisation"],
      query: () => ({
        url: VERIFIED_ORGANISATION,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Verify organisation
    verifyOrganisation: builder.mutation({
      invalidatesTags: ["Organisation"],
      query: (id) => ({
        url: `${VERIFY_ORGANISATION}${id}`,
        method: "PUT",
      }),
    }),
  }),
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
});

export const {
  useUnverifiedOrganisationQuery,
  useVerifiedOrganisationQuery,
  useVerifyOrganisationMutation,
} = organisationApi;
