import { createSlice } from "@reduxjs/toolkit";

const selectorSlice = createSlice({
  name: "selector",

  initialState: {
    fromChains: [],
    toChains: [],
    mode: "from",
  },

  reducers: {
    setFromChains: (state, action) => {
      state.fromChains = action.payload;
    },
    setToChains: (state, action) => {
      state.toChains = action.payload;
    },
    addFromChain: (state, action) => {
      state.fromChains.push(action.payload);
    },
    addToChain: (state, action) => {
      state.toChains.push(action.payload);
    },
    removeFromChain: (state, action) => {
      state.fromChains = state.fromChains.filter(
        (chain) => chain !== action.payload
      );
    },
    removeToChain: (state, action) => {
      state.toChains = state.toChains.filter(
        (chain) => chain !== action.payload
      );
    },
    resetSelectedChains: (state) => {
      state.fromChains = [];
      state.toChains = [];
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  setFromChains,
  setToChains,
  addFromChain,
  addToChain,
  resetSelectedChains,
  setMode,
  removeFromChain,
  removeToChain,
} = selectorSlice.actions;

export default selectorSlice.reducer;
