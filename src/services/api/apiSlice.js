// import enviroment from "configs/enviroment.config";
// import { REHYDRATE } from "redux-persist";
import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "services/custom-query/customBaseQuery";
// import { SkipToken } from "@reduxjs/toolkit/dist/query";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  // extractRehydrationInfo: (action, { reducerPath }) => {
  //   if (action.type === REHYDRATE) {
  //     return action.payload?.[reducerPath];
  //   }
  // },
  tagTypes: ["User", "Organization", "Projects", "Staff", "Transaction"],
  endpoints: (builder) => ({}),
  // refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 50000
});

export default apiSlice;
