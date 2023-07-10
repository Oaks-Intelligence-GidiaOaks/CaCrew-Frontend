import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  GET_HANDLED_PROJECTS,
} from "services/constants";
import apiSlice from "./api/apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all Projects route
    allProjects: builder.query({
      providesTags: ["Projects"],
      query: () => ({
        url: GET_ALL_PROJECTS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Get handled project
    getHandledProjects: builder.query({
      providesTags: ["Projects"],
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
      invalidatesTags: ["Projects"],
      query: (data) => ({
        url: ADD_PROJECT,
        method: "POST",
        body: data,
      }),
    }),
  }),
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: true,
});

export const {
  useAddProjectMutation,
  useAllProjectsQuery,
  useGetHandledProjectsQuery,
} = projectApiSlice;
