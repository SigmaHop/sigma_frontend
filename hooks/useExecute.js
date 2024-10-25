"use client";

import { chains } from "@/lib/config";
import { resetStep } from "@/redux/slice/stepSlice";
import {
  resetEstimates,
  setGasEstimatesByChainId,
  setLoading,
  setSignature,
} from "@/redux/slice/transactionSlice";
import { useEthersSigner } from "@/utils/ethersSigner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function useExecute() {
  const signer = useEthersSigner();
  const fromChains = useSelector((state) => state.selector.fromChains);
  const toChains = useSelector((state) => state.selector.toChains);
  const amounts = useSelector((state) => state.selector.amounts);
  const recipients = useSelector((state) => state.selector.recipients);
  const signature = useSelector((state) => state.transaction.signature);
  const vaultAddress = useSelector((state) => state.vault.address);
  const dispatch = useDispatch();
  const deadline = useSelector((state) => state.transaction.deadline);

  const execute = async () => {
    if (
      fromChains.length === 1 &&
      toChains.length === 1 &&
      fromChains[0] === toChains[0]
    ) {
      try {
        dispatch(setLoading(true));
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

        console.log(payload);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transfer/local/${chain.chainId}`,
          payload
        );

        if (res?.data?.success) {
          toast(
            <div className="flex flex-col items-center text-center text-sm justify-center gap-2">
              <p>Transaction Successful</p>
              <a
                href={`${chain.explorerURL}/tx/${res.data.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] underline"
              >
                View on Explorer
              </a>
            </div>
          );

          dispatch(resetStep());
          dispatch(resetEstimates());
          dispatch(setSignature(null));
        } else {
          toast("Transaction Failed");
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return {
    execute,
  };
}
