"use client";

import useVault from "@/hooks/useVault";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const WalletProvider = ({ children }) => {
  const { isConnected } = useAccount();
  const { initializeVault, listenForBalance } = useVault();

  useEffect(() => {
    if (isConnected) {
      initializeVault();
      listenForBalance();
    }
  }, [isConnected]);

  return <>{children}</>;
};

export default WalletProvider;
