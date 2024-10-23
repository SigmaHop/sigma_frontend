"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import modalReducer from "./slice/modalSlice";
import vaultReducer from "./slice/vaultSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `counter`, handled by `counterReducer`
    counter: counterReducer,
    modal: modalReducer,
    vault: vaultReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
