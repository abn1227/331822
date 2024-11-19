import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

import authReducer from "./slices/authSlice";
import categoriesReducer from "./slices/categoriesSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "loading", "error", "isAuthenticated"],
};

const categoriesPersistConfig = {
  key: "categories",
  storage,
  whitelist: [
    "expertise",
    "services",
    "availability",
    "jobPetitionStatus",
    "loading",
    "error",
  ],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    categories: persistReducer(categoriesPersistConfig, categoriesReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
