"use client";

import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { toggleChainSelectorModal } from "@/redux/slice/modalSlice";
import { chains } from "@/lib/config";
import formatAmount from "@/lib/formatAmount";
import {
  addFromChain,
  addToChain,
  removeFromChain,
  removeToChain,
} from "@/redux/slice/selectorSlice";

export default function ChainSelectorModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.chainSelectorModal);
  const fromChains = useSelector((state) => state.selector.fromChains);
  const toChains = useSelector((state) => state.selector.toChains);
  const mode = useSelector((state) => state.selector.mode);
  const balanceData = useSelector((state) => state.vault.balances);

  const handleDrawer = () => {
    dispatch(toggleChainSelectorModal());
  };

  return (
    <Dialog
      size="sm"
      open={open}
      handler={handleDrawer}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="font-outfit bg-transparent items-center justify-center flex shadow-none"
    >
      <DialogBody className="text-[var(--primary)] flex flex-col gap-y-4 py-5 font-outfit rounded-none bg-black border border-[var(--primary)] w-full max-w-[24rem] px-5 pb-6">
        <p className="font-bold text-xl">Select Chains</p>

        {chains.map((chain) => {
          const currentBalanceData =
            balanceData &&
            balanceData.length > 0 &&
            balanceData.find((data) => data.chainId === chain.chainId);

          const balance = currentBalanceData
            ? formatAmount(Number(currentBalanceData.balance) / 10 ** 6, 2)
            : "0.00";

          return (
            <Button
              key={chain.name}
              className="flex justify-between p-5 rounded-none bg-black border border-[var(--primary)] text-[var(--primary)]"
              style={{
                backgroundColor:
                  mode === "from"
                    ? fromChains.includes(chain.chainId)
                      ? "var(--primary)"
                      : "transparent"
                    : toChains.includes(chain.chainId)
                    ? "var(--primary)"
                    : "transparent",
                color:
                  mode === "from"
                    ? fromChains.includes(chain.chainId)
                      ? "black"
                      : "var(--primary)"
                    : toChains.includes(chain.chainId)
                    ? "black"
                    : "var(--primary)",
              }}
              disabled={
                mode === "from"
                  ? fromChains.length === 1 &&
                    toChains.length > 1 &&
                    !fromChains.includes(chain.chainId)
                  : toChains.length === 1 &&
                    fromChains.length > 1 &&
                    !toChains.includes(chain.chainId)
              }
              onClick={() => {
                if (mode === "from") {
                  if (fromChains.includes(chain.chainId)) {
                    dispatch(removeFromChain(chain.chainId));
                  } else {
                    dispatch(addFromChain(chain.chainId));
                  }
                } else {
                  if (toChains.includes(chain.chainId)) {
                    dispatch(removeToChain(chain.chainId));
                  } else {
                    dispatch(addToChain(chain.chainId));
                  }
                }
              }}
            >
              <div className="text-xs flex flex-col text-left">
                {chain.name}
                <div className="h-2">
                  {mode === "from" ? (
                    fromChains.includes(chain.chainId) ? (
                      <p className="text-[10px]">Selected</p>
                    ) : null
                  ) : (
                    toChains.includes(chain.chainId) && (
                      <p className="text-[10px]">Selected</p>
                    )
                  )}
                </div>
              </div>
              <p className="text-lg font-bold">
                {currentBalanceData
                  ? balance.toString() !== "0"
                    ? balance
                    : "0.00"
                  : "0.00"}{" "}
                USDC
              </p>
            </Button>
          );
        })}
      </DialogBody>
    </Dialog>
  );
}
