import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import register from "./slices/register.slice";
import { userApi } from "services/user.service";
import { organisationApi } from "services/organisation.service";
import { staffApi } from "services/staff.service";
import { projectApi } from "services/project.service";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel1";
// import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const rootReducer = combineReducers({
  formdata: register,
  [userApi.reducerPath]: userApi.reducer,
  [organisationApi.reducerPath]: organisationApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // stateReconciler: hardSet,
  // blacklist: userApi.reducerPath,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      organisationApi.middleware,
      staffApi.middleware,
      projectApi.middleware
    ),
});

const persistor = persistStore(store);

export default store;
export { persistor };
