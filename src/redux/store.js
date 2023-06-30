import { configureStore, combineReducers } from "@reduxjs/toolkit";
import register from "./slices/register.slice";
import { userApi } from "services/auth.service";
import { organisationApi } from "services/organisation.service";

const rootReducer = combineReducers({
  formdata: register,
  [userApi.reducerPath]: userApi.reducer,
  [organisationApi.reducerPath]: organisationApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      organisationApi.middleware
    ),
});

export default store;
