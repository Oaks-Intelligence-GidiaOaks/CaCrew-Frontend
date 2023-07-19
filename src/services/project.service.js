import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  GET_HANDLED_PROJECTS,
  UPDATE_PROJECT,
} from "services/constants";
import apiSlice from "./api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all Projects route
    allProjects: builder.query({
      query: () => ({
        url: GET_ALL_PROJECTS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["Projects"]
      // providesTags: (result, error, arg) => [
      //   result?.length > 0 && { type: "Projects", id: "LIST" },
      //    ...result?.map((item) => ({ type: "Projects", id: item?._id })),
      // ],
    }),

    // Get handled project
    getHandledProjects: builder.query({
      // providesTags: ["Projects"],
      query: () => ({
        url: GET_HANDLED_PROJECTS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Add Projects
    addProject: builder.mutation({
      // invalidatesTags: [{ type: "Projects", id: "LIST" }],
      invalidatesTags: ["Projects"],
      query: (data) => ({
        url: ADD_PROJECT,
        method: "POST",
        body: data,
      }),
    }),

    // Update Project
    updateProject: builder.mutation({
      // invalidatesTags: [{ type: "Projects", id: "LIST" }],
      invalidatesTags: ["Projects"],
      query: (data) => ({
        url: `${UPDATE_PROJECT}${data.id}`,
        method: "PUT",
        body: data.body,
      }),
    }),
  }),
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useAllProjectsQuery,
  useGetHandledProjectsQuery,
} = projectApiSlice;
