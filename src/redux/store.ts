import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "./ContactApi";

export const store = configureStore({
    reducer: {
      [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(contactApi.middleware),
  })
