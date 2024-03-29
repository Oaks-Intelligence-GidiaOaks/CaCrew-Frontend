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
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import register from "./slices/register.slice";
import modal from "./slices/modal.slice";
import message from "./slices/message.slice";
import apiSlice from "services/api/apiSlice";
import user from "./slices/user.slice";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const rootReducer = combineReducers({
  user,
  modal,
  formdata: register,
  message,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [
    encryptTransform({
      secretKey: "process.env.REACT_ENCRYPT_KEY",
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  stateReconciler: hardSet,
  blacklist: apiSlice.reducerPath,
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
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export default store;
export { persistor };
