import { chains } from "@/lib/config";
import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",

  initialState: {
    signature: null,
    gas: chains.map((c) => ({
      chainId: c.chainId,
      gasEstimates: null,
    })),
    deadline: null,
    loading: false,
  },

  reducers: {
    setSignature: (state, action) => {
      state.signature = action.payload;
    },

    setGasEstimatesByChainId: (state, action) => {
      const { chainId, gasEstimates } = action.payload;
      const index = state.gas.findIndex((g) => g.chainId === chainId);

      state.gas[index].gasEstimates = gasEstimates;
    },

    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },

    resetEstimates: (state) => {
      state.gas = chains.map((c) => ({
        chainId: c.chainId,
        gasEstimates: null,
      }));
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSignature,
  setGasEstimatesByChainId,
  setDeadline,
  resetEstimates,
  setLoading,
} = transactionSlice.actions;

export default transactionSlice.reducer;
