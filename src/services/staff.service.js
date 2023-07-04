import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import { GET_ALL_STAFFS, ADD_STAFF } from "services/constants";
import { REHYDRATE } from "redux-persist";

export const staffApi = createApi({
  reducerPath: "staffs",
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
    addTagTypes: "Staff",
    // get all staffs route
    allStaffs: builder.query({
      providesTags: ["Staff"],
      query: () => ({
        url: GET_ALL_STAFFS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Add staffs
    addStaff: builder.mutation({
      invalidatesTags: ["Staff"],
      query: (data) => ({
        url: `${ADD_STAFF}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
//   refetchOnMountOrArgChange: true,
});

export const { useAllStaffsQuery, useAddStaffMutation } = staffApi;
