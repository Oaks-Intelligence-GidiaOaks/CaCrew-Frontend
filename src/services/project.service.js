import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  GET_HANDLED_PROJECTS,
  UPDATE_PROJECT,
  CLOSE_PROJECT,
  CLOSE_PROJECT_DETAIL,
  ALL_CLOSE_PROJECT,
  PROJECT_DATABASE,
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
      providesTags: ["Projects"],
      // providesTags: (result, error, arg) => [
      //   result?.length > 0 && { type: "Projects", id: "LIST" },
      //    ...result?.map((item) => ({ type: "Projects", id: item?._id })),
      // ],
    }),

    // Get all closed projects
    allClosedProjects: builder.query({
      query: () => ({
        url: ALL_CLOSE_PROJECT,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["ClosedProjects"],
    }),

    // Get closed project detail
    closedProjectDetail: builder.query({
      query: (id) => ({
        url: `${CLOSE_PROJECT_DETAIL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      // providesTags: ["Projects"],
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

    // Close Project
    closeProject: builder.mutation({
      // invalidatesTags: [{ type: "Projects", id: "LIST" }],
      invalidatesTags: ["ClosedProjects"],
      query: (id) => ({
        url: `${CLOSE_PROJECT}/${id}`,
        method: "PUT",
      }),
    }),

    projectDatabase: builder.query({
      query: ({ page = 1, search}) => ({
        url: `${PROJECT_DATABASE}?page=${page}${search && `&search=${search}`}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
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
  useAllClosedProjectsQuery,
  useCloseProjectMutation,
  useClosedProjectDetailQuery,
  useProjectDatabaseQuery,
} = projectApiSlice;
