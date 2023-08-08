import apiSlice from "./api/apiSlice";
import { DOCUMENTS } from "services/constants";

export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all staffs route
    allDocuments: builder.query({
      providesTags: ["Document"],
      query: () => ({
        url: DOCUMENTS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Add staffs
    addDocument: builder.mutation({
      query: (data) => ({
        url: `${DOCUMENTS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Document"],
    }),
  }),
  //   refetchOnMountOrArgChange: true,
});

export const { useAddDocumentMutation, useAllDocumentsQuery } = documentApiSlice;
