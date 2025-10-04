import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api.ts";
import authReducer from "./authSlice.ts";
import filtersReducer from "./filtersSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
