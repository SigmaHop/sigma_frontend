"use client";

import { abis, chains } from "@/lib/config";
import { resetAmounts } from "@/redux/slice/selectorSlice";
import { resetStep } from "@/redux/slice/stepSlice";
import {
  resetEstimates,
  setGasEstimatesByChainId,
  setLoading,
  setSignature,
} from "@/redux/slice/transactionSlice";
import { useEthersSigner } from "@/utils/ethersSigner";
import axios from "axios";
import { ethers } from "ethers";
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
          dispatch(resetEstimates());
          dispatch(setSignature(null));
        }
      } catch (error) {
        toast("Transaction Failed");
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else if (
      (fromChains.length === 1 && toChains.length > 1) ||
      (fromChains.length === 1 &&
        toChains.length === 1 &&
        fromChains[0] !== toChains[0])
    ) {
      try {
        dispatch(setLoading(true));
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

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transfer/singleToMulti/${chain.chainId}`,
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
          dispatch(resetAmounts());
        } else {
          toast("Transaction Failed");
          dispatch(resetEstimates());
          dispatch(setSignature(null));
          dispatch(resetAmounts());
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      try {
        dispatch(setLoading(true));
        const srcChains = fromChains.map((c) =>
          chains.find((chain) => chain.chainId === c)
        );

        const amount = fromChains.map((c) => {
          return amounts.find((a) => a.chainId === c).amount;
        });

        const recipient = recipients.find((r) => r.chainId === toChains[0]);

        const destChain = chains.find((c) => c.chainId === toChains[0]);

        let nonces = [];

        for (let i = 0; i < srcChains.length; i++) {
          const chain = srcChains[i];
          const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

          const sigmaForwarder = new ethers.Contract(
            chain.deployments.SigmaForwarder,
            abis.SigmaForwarder,
            provider
          );

          const nonce = await sigmaForwarder.nonces(signer._address);

          nonces.push(Number(nonce));
        }

        const payload = {
          SigmaUSDCVault: vaultAddress,
          SigmaHop: srcChains[0].deployments.SigmaHop,
          from: signer._address,
          to: recipient.address,
          amounts: amount.map((a) => Number(a * 10 ** 6).toFixed(0)),
          srcChains: srcChains.map((c) => c.wormhole.chainId),
          destChain: destChain.wormhole.chainId,
          nonces: nonces,
          deadline: deadline,
          signature: signature,
        };

        let Status = [];

        await Promise.all(
          srcChains.map(async (chain) => {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transfer/multiToSingle/${chain.chainId}`,
              payload
            );

            console.log(res.data);

            Status.push({
              data: res.data,
              chain: chain,
            });
          })
        );

        Status.map((s) => {
          if (s.data.success) {
            toast(
              <div className="flex flex-col items-center text-center text-sm justify-center gap-2">
                <p>Transaction Successful</p>
                <a
                  href={`${s.chain.explorerURL}/tx/${s.data.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] underline"
                >
                  View on {s.chain.name} Explorer
                </a>
              </div>
            );

            dispatch(resetStep());
            dispatch(resetEstimates());
            dispatch(setSignature(null));
            dispatch(resetAmounts());
          } else {
            toast("Transaction Failed");
            dispatch(resetStep());
            dispatch(resetEstimates());
            dispatch(setSignature(null));
            dispatch(resetAmounts());
          }
        });
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
