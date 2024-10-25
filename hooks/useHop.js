"use client";

import { abis, chains } from "@/lib/config";
import { ethers } from "ethers";
import useUtils from "./useUtils";

export default function useHop() {
  const { convertToUSDC } = useUtils();

  const getCrossChainQuotes = async (fromChainId, toChainId) => {
    const fromChain = chains.find((c) => c.chainId === fromChainId);

    const toChain = chains.find((c) => c.chainId === toChainId);

    const provider = new ethers.providers.JsonRpcProvider(fromChain.rpcUrl);

    const sigmaHop = new ethers.Contract(
      fromChain.deployments.SigmaHop,
      abis.SigmaHop,
      provider
    );

    const quote = await sigmaHop.quoteCrossChainDeposit(
      toChain.wormhole.chainId
    );

    const conversion = await convertToUSDC(
      fromChain.converstionId,
      fromChain.usdcId
    );

    const usdcQuote = (Number(quote) / 10 ** 18) * conversion;

    return usdcQuote;
  };

  return { getCrossChainQuotes };
}
