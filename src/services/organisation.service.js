import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import { ALL_ORGANISATION, VERIFY_ORGANISATION } from "services/constants";

export const organisationApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: enviroment.API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login users route
    allOrganisation: builder.query({
      query: () => ({
        url: ALL_ORGANISATION,
        method: "GET",
        // body: userData,
      }),
      transformResponse: (response) => {
        if (response) {
          //   return response.token;
          console.log(response, "rtk");
        } else {
          throw new Error(response);
        }
      },
    }),

    // Register users route
    verifyOrganisation: builder.mutation({
      query: (id) => ({
        url: `${VERIFY_ORGANISATION}${id}`,
        method: "POST",
        // body: userData,
      }),
    }),
  }),
});

export const { useAllOrganisationQuery, useVerifyOrganisationQuery } = organisationApi;
