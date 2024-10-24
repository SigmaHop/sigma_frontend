import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    connectModal: false,
    chainSelectorModal: false,
  },

  reducers: {
    toggleConnectModal: (state) => {
      state.connectModal = !state.connectModal;
    },
    toggleChainSelectorModal: (state) => {
      state.chainSelectorModal = !state.chainSelectorModal;
    },
  },
});

export const {
  toggleConnectModal,
  toggleChainSelectorModal,
} = modalSlice.actions;

export default modalSlice.reducer;
