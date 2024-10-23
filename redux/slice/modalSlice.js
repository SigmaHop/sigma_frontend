import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",

  initialState: {
    connectModal: false,
  },

  reducers: {
    toggleConnectModal: (state) => {
      state.connectModal = !state.connectModal;
    },
  },
});

export const { toggleConnectModal } = modalSlice.actions;

export default modalSlice.reducer;
