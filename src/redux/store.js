import { configureStore, combineReducers } from "@reduxjs/toolkit";
import register from "./slices/register.slice";
import { userApi } from "services/auth.service";

const rootReducer = combineReducers({
  formdata: register,
  [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
});

export default store;
