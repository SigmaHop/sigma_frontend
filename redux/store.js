"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import modalReducer from "./slice/modalSlice";
import vaultReducer from "./slice/vaultSlice";
import stepReducer from "./slice/stepSlice";
import selectorReducer from "./slice/selectorSlice";
import transactionReducer from "./slice/transactionSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `counter`, handled by `counterReducer`
    counter: counterReducer,
    modal: modalReducer,
    vault: vaultReducer,
    step: stepReducer,
    selector: selectorReducer,
    transaction: transactionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
