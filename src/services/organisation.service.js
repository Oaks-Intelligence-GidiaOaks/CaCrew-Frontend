import {
  SET_SALE_ORGANISATION,
  UNVERIFIED_ORGANISATION,
  UPDATE_ORGANISATION,
  VERIFIED_ORGANISATION,
  VERIFY_ORGANISATION,
} from "services/constants";
import apiSlice from "./api/apiSlice";

export const organisationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all organisations route
    unverifiedOrganisation: builder.query({
      providesTags: ["Organisation"],
      query: ({page = 1}) => ({
        url: `${UNVERIFIED_ORGANISATION}?page=${page}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    verifiedOrganisation: builder.query({
      providesTags: ["Organisation"],
      query: ({page = 1}) => ({
        url: `${VERIFIED_ORGANISATION}?page=${page}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // update organistion
    updateOrganisation: builder.mutation({
      invalidatesTags: ["User", "Organization"],
      query: (data) => ({
        url: UPDATE_ORGANISATION,
        method: "PUT",
        body: data,
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

    // Set sale
    setSaleOrganisation: builder.mutation({
      // invalidatesTags: ["Organisation"],
      query: (bodyData) => ({
        url: `${SET_SALE_ORGANISATION}`,
        method: "PUT",
        body: bodyData,
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
  useSetSaleOrganisationMutation,
  useUpdateOrganisationMutation,
} = organisationApiSlice;
