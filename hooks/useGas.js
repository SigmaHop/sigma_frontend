"use client";

import { chains } from "@/lib/config";
import { setGasEstimatesByChainId } from "@/redux/slice/transactionSlice";
import { useEthersSigner } from "@/utils/ethersSigner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function useGas() {
  const signer = useEthersSigner();
  const fromChains = useSelector((state) => state.selector.fromChains);
  const toChains = useSelector((state) => state.selector.toChains);
  const amounts = useSelector((state) => state.selector.amounts);
  const recipients = useSelector((state) => state.selector.recipients);
  const signature = useSelector((state) => state.transaction.signature);
  const vaultAddress = useSelector((state) => state.vault.address);
  const dispatch = useDispatch();
  const deadline = useSelector((state) => state.transaction.deadline);

  const estimateGas = async () => {
    if (
      fromChains.length === 1 &&
      toChains.length === 1 &&
      fromChains[0] === toChains[0]
    ) {
      const chain = chains.find((c) => c.chainId === fromChains[0]);
      const amount = amounts.find((a) => a.chainId === chain.chainId).amount;
      const recipient = recipients.find((r) => r.chainId === chain.chainId)
        .address;

      const payload = {
        SigmaUSDCVault: vaultAddress,
        from: signer._address,
        to: recipient,
        amount: Number(amount * 10 ** 6).toFixed(0),
        deadline: deadline,
        signature: signature,
      };

      const gasEstimates = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gas/local/${chain.chainId}`,
        payload
      );

      dispatch(
        setGasEstimatesByChainId({
          chainId: chain.chainId,
          gasEstimates: gasEstimates.data,
        })
      );
    } else if (
      (fromChains.length === 1 && toChains.length > 1) ||
      (fromChains.length === 1 &&
        toChains.length === 1 &&
        fromChains[0] !== toChains[0])
    ) {
      const chain = chains.find((c) => c.chainId === fromChains[0]);

      const Amounts = toChains.map((c) => {
        return amounts.find((a) => a.chainId === c).amount;
      });

      const Recipients = toChains.map((c) => {
        return recipients.find((r) => r.chainId === c).address;
      });

      const recipientChains = toChains.map((c) => {
        return chains.find((chain) => chain.chainId === c).wormhole.chainId;
      });

      const payload = {
        SigmaUSDCVault: vaultAddress,
        sigmaHop: chain.deployments.SigmaHop,
        from: signer._address,
        tos: Recipients,
        amounts: Amounts.map((a) => Number(a * 10 ** 6).toFixed(0)),
        destchains: recipientChains,
        deadline: deadline,
        signature: signature,
      };

      const gasEstimates = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gas/singleToMulti/${chain.chainId}`,
        payload
      );

      dispatch(
        setGasEstimatesByChainId({
          chainId: chain.chainId,
          gasEstimates: gasEstimates.data,
        })
      );
    }
  };

  return {
    estimateGas,
  };
}
