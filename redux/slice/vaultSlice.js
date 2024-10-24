import { createSlice } from "@reduxjs/toolkit";

const vaultSlice = createSlice({
  name: "vault",

  initialState: {
    address: 0,
    balances: null,
  },

  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },

    setBalances: (state, action) => {
      state.balances = action.payload;
    },
  },
});

export const { setAddress, setBalances } = vaultSlice.actions;

export default vaultSlice.reducer;
