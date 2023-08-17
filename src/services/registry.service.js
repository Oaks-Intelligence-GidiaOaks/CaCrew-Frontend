import { GET_ALL_STAFFS, ADD_STAFF } from "services/constants";
import apiSlice from "./api/apiSlice";

export const staffApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all staffs route
    allStaffs: builder.query({
      // providesTags: (result, error, arg) => [
      //   { type: "Staff", id: "List" },
      //   ...result?._id?.map((id) => ({ type: "Staff", id })),
      // ],
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
      query: (data) => ({
        url: `${ADD_STAFF}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: { type: "Staff", id: "List" },
    }),
  }),
  //   refetchOnMountOrArgChange: true,
});

export const { useAllStaffsQuery, useAddStaffMutation } = staffApiSlice;
