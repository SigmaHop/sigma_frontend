"use client";

import { abis, chains } from "@/lib/config";
import { setAddress } from "@/redux/slice/vaultSlice";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

export default function useVault() {
  const { address } = useAccount();
  const dispatch = useDispatch();

  const initializeVault = async () => {
    const initialChain = chains[0];
    const provider = new ethers.providers.JsonRpcProvider(initialChain.rpcUrl);

    const SigmaProxyFactory = new ethers.Contract(
      initialChain.deployments.SigmaProxyFactory,
      abis.SigmaProxyFactory,
      provider
    );

    const vaultAddress = await SigmaProxyFactory.getSigmaProxy(address);

    dispatch(setAddress(vaultAddress));

    return vaultAddress;
  };

  return { initializeVault };
}
