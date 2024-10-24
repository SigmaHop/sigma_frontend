"use client";

import { chains } from "@/lib/config";
import { toggleChainSelectorModal } from "@/redux/slice/modalSlice";
import {
  removeFromChain,
  setMode,
  removeToChain,
} from "@/redux/slice/selectorSlice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

export default function ChainSelector({ fromChains, toChains, mode = "from" }) {
  const dispatch = useDispatch();

  if (
    (mode === "from" && fromChains.length === 0) ||
    (mode === "to" && toChains.length === 0)
  ) {
    return (
      <div
        className="p-5 bg-transparent hover:cursor-pointer border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
        onClick={() => {
          dispatch(toggleChainSelectorModal());
          dispatch(setMode(mode));
        }}
      >
        Select Chains
      </div>
    );
  } else {
    return (
      <div className="p-5 bg-transparent flex gap-2 border border-[var(--primary)] flex-wrap rounded-none text-[var(--primary)]">
        {mode === "from" &&
          fromChains.map((chain, index) => {
            const currentChain = chains.find((c) => c.chainId === chain);

            return (
              <div
                key={currentChain.name}
                className="flex justify-between text-[10px] border border-[var(--primary)] hover:cursor-pointer items-center gap-2 w-fit p-2"
                onClick={() => {
                  dispatch(removeFromChain(chain));
                }}
              >
                <div>{currentChain.name}</div>
                <button className="bg-[var(--primary)] text-black px-1">
                  X
                </button>
              </div>
            );
          })}
        {mode === "to" &&
          toChains.map((chain, index) => {
            const currentChain = chains.find((c) => c.chainId === chain);

            return (
              <div
                key={currentChain.name}
                className="flex justify-between text-[10px] border border-[var(--primary)] hover:cursor-pointer items-center gap-2 w-fit p-2"
                onClick={() => {
                  dispatch(removeToChain(chain));
                }}
              >
                <div>{currentChain.name}</div>
                <button className="bg-[var(--primary)] text-black px-1">
                  X
                </button>
              </div>
            );
          })}

        <Button
          className="bg-transparent text-2xl p-0 px-2 border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
          onClick={() => {
            if (mode === "from") {
              dispatch(setMode("from"));
              dispatch(toggleChainSelectorModal());
            } else {
              dispatch(setMode("to"));
              dispatch(toggleChainSelectorModal());
            }
          }}
        >
          +
        </Button>
      </div>
    );
  }
}
