"use client";

import useVault from "@/hooks/useVault";
import { resetStep } from "@/redux/slice/stepSlice";
import { resetEstimates } from "@/redux/slice/transactionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

export const WalletProvider = ({ children }) => {
  const { isConnected } = useAccount();
  const { initializeVault, listenForBalance } = useVault();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      initializeVault();
      listenForBalance();
      dispatch(resetStep());
      dispatch(resetEstimates());
    }
  }, [isConnected]);

  return <>{children}</>;
};

export default WalletProvider;
