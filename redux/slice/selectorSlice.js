import { createSlice } from "@reduxjs/toolkit";
import { chains } from "@/lib/config";

const selectorSlice = createSlice({
  name: "selector",

  initialState: {
    fromChains: [],
    toChains: [],
    amounts: chains.map((chain) => ({
      chainId: chain.chainId,
      amount: 0,
    })),
    recipients: chains.map((chain) => ({
      chainId: chain.chainId,
      address: "",
    })),
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
    setAmountByChainId: (state, action) => {
      const { chainId, amount } = action.payload;
      const index = state.amounts.findIndex(
        (amount) => amount.chainId === chainId
      );

      state.amounts[index].amount = amount;
    },

    setRecipientByChainId: (state, action) => {
      const { chainId, address } = action.payload;
      const index = state.recipients.findIndex(
        (recipient) => recipient.chainId === chainId
      );

      state.recipients[index].address = address;
    },
    resetAmounts: (state) => {
      state.amounts = chains.map((chain) => ({
        chainId: chain.chainId,
        amount: 0,
      }));
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
  setAmountByChainId,
  setRecipientByChainId,
  resetAmounts,
} = selectorSlice.actions;

export default selectorSlice.reducer;
