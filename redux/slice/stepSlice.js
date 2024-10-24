import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",

  initialState: {
    step: 0,
  },

  reducers: {
    increment: (state) => {
      state.step += 1;
    },
    decrement: (state) => {
      state.step -= 1;
    },
    incrementByAmount: (state, action) => {
      state.step += action.payload;
    },
    resetStep: (state) => {
      state.step = 0;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  resetStep,
} = stepSlice.actions;

export default stepSlice.reducer;
