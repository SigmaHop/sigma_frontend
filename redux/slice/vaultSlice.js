import { createSlice } from "@reduxjs/toolkit";

const vaultSlice = createSlice({
  name: "vault",

  initialState: {
    address: 0,
  },

  reducers: {
    setAddress: (state, action) => {
      state.address = action;
    },
  },
});

export const { setAddress } = vaultSlice.actions;

export default vaultSlice.reducer;
