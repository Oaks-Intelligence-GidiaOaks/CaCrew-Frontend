import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import enviroment from "configs/enviroment.config";
import { REHYDRATE } from "redux-persist";
// import { SkipToken } from "@reduxjs/toolkit/dist/query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: enviroment.API_BASE_URL }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  tagTypes: ["User", "Organization"],
  endpoints: (builder) => ({}),
});

// prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     }
