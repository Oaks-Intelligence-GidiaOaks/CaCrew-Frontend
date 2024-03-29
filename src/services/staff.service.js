import {
  ADD_STAFF,
  MAKE_STAFF_ADMIN,
  REMOVE_STAFF,
  STAFF,
  STAFF_ASSIGN_PROJ,
  STAFF_ASSIGN_PROJ_HANDLER,
} from "services/constants";
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
        url: STAFF,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Get staff by Id
    getStaff: builder.query({
      query: (id) => ({
        url: `${STAFF}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Update staff
    updateStaff: builder.mutation({
      query: (id) => ({
        url: `${STAFF}/${id}`,
        method: "PUT",
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Staff"]
    }),

    // Update staff
    removeStaff: builder.mutation({
      query: (id) => ({
        url: `${REMOVE_STAFF}/${id}`,
        method: "PUT",
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Staff"]
    }),

    // make staff admin
    makeStaffAdmin: builder.mutation({
      query: (id) => ({
        url: `${MAKE_STAFF_ADMIN}/${id}`,
        method: "PUT",
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Staff"]
    }),

    // assign project
    assignStaffProject: builder.mutation({
      query: (body) => ({
        url: `${STAFF_ASSIGN_PROJ}`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Staff"]
    }),

    // assign project handler
    assignStaffProjectHandler: builder.mutation({
      query: (body) => ({
        url: `${STAFF_ASSIGN_PROJ_HANDLER}`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Staff"]
    }),

    // Add staffs
    addStaff: builder.mutation({
      query: (data) => ({
        url: `${ADD_STAFF}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
  //   refetchOnMountOrArgChange: true,
});

export const {
  useAllStaffsQuery,
  useAddStaffMutation,
  useAssignStaffProjectHandlerMutation,
  useAssignStaffProjectMutation,
  useGetStaffQuery,
  useMakeStaffAdminMutation,
  useRemoveStaffMutation,
  useUpdateStaffMutation,
} = staffApiSlice;
