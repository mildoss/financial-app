import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api.ts";
import authReducer from "./authSlice.ts";
import filtersReducer from "./filtersSlice.ts";
import toasterReducer from "./toastSlice.ts"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    toast: toasterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
