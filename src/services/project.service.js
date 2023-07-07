import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "configs/enviroment.config";
import {
  ADD_PROJECT,
  GET_ALL_PROJECTS,
  GET_HANDLED_PROJECTS,
} from "services/constants";
import { REHYDRATE } from "redux-persist";

export const projectApi = createApi({
  reducerPath: "projects",
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
    addTagTypes: ["Projects"],
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
} = projectApi;
