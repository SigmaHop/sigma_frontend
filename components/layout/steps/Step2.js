"use client";

import { chains } from "@/lib/config";
import formatAmount from "@/lib/formatAmount";
import { setAmountByChainId } from "@/redux/slice/selectorSlice";
import { increment } from "@/redux/slice/stepSlice";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function Step2() {
  const dispatch = useDispatch();
  const toChains = useSelector((state) => state.selector.toChains);
  const amounts = useSelector((state) => state.selector.amounts);
  const balanceData = useSelector((state) => state.vault.balances);
  const fromChains = useSelector((state) => state.selector.fromChains);
  let isValid = false;
  const totalAmount = amounts.reduce((acc, a) => acc + Number(a.amount), 0);

  return (
    <div className="p-5 flex flex-col justify-between h-full w-full">
      <div className="flex flex-col flex-1 w-full gap-2">
        <h2 className="font-bold text-xl text-center">Set Amount</h2>

        {toChains &&
          fromChains.length === 1 &&
          toChains.map((chain) => {
            const currentChain = chains.find((c) => c.chainId === chain);
            const mainChain = chains.find((c) => c.chainId === fromChains[0]);
            const amount = amounts.find((a) => a.chainId === chain).amount;

            const isSameChain = fromChains.includes(chain);

            const setAmount = (e) => {
              const regex = /^[0-9]*\.?[0-9]*$/;
              if (!regex.test(e.target.value)) {
                return;
              }

              dispatch(
                setAmountByChainId({
                  chainId: chain,
                  amount: e.target.value,
                })
              );
            };

            const currentBalanceData =
              balanceData &&
              balanceData.length > 0 &&
              balanceData.find((data) => data.chainId === mainChain.chainId);

            const balance = currentBalanceData
              ? formatAmount(Number(currentBalanceData.balance) / 10 ** 6, 2)
              : "0.00";

            isValid = amount > 0 && totalAmount <= balance;

            return (
              <div key={chain} className="flex flex-col gap-2 mt-2">
                <p className="text-xs">To {currentChain.name}</p>
                <div className="flex gap-2 items-center  justify-center">
                  <input
                    type="text"
                    className="border border-[var(--primary)] flex-1 bg-black rounded-none p-2 outline-none"
                    value={amount}
                    onChange={setAmount}
                    placeholder="0.00"
                  />
                  <Button
                    className="bg-transparent border border-[var(--primary)] p-3 text-[10px] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
                    onClick={() => {
                      dispatch(
                        setAmountByChainId({
                          chainId: chain,
                          amount: balance,
                        })
                      );
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex gap-2 justify-between">
                  {isSameChain && (
                    <p className="text-xs">Wormhole fees: 0 USDC</p>
                  )}
                </div>
              </div>
            );
          })}

        {fromChains &&
          toChains.length === 1 &&
          fromChains.map((chain) => {
            const currentChain = chains.find((c) => c.chainId === chain);
            const amount = amounts.find((a) => a.chainId === chain).amount;

            const isSameChain = toChains.includes(chain);

            const setAmount = (e) => {
              const regex = /^[0-9]*\.?[0-9]*$/;
              if (!regex.test(e.target.value)) {
                return;
              }

              dispatch(
                setAmountByChainId({
                  chainId: chain,
                  amount: e.target.value,
                })
              );
            };

            const currentBalanceData =
              balanceData &&
              balanceData.length > 0 &&
              balanceData.find((data) => data.chainId === chain);

            const balance = currentBalanceData
              ? formatAmount(Number(currentBalanceData.balance) / 10 ** 6, 2)
              : "0.00";

            isValid = amount > 0 && amount <= balance;

            return (
              <div key={chain} className="flex flex-col gap-2 mt-2">
                <p className="text-xs">From {currentChain.name}</p>
                <div className="flex gap-2 items-center  justify-center">
                  <input
                    type="text"
                    className="border border-[var(--primary)] flex-1 bg-black rounded-none p-2 outline-none"
                    value={amount}
                    onChange={setAmount}
                    placeholder="0.00"
                  />
                  <Button
                    className="bg-transparent border border-[var(--primary)] p-3 text-[10px] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
                    onClick={() => {
                      dispatch(
                        setAmountByChainId({
                          chainId: chain,
                          amount: balance,
                        })
                      );
                    }}
                  >
                    MAX
                  </Button>
                </div>
                <div className="flex gap-2 justify-between">
                  {isSameChain && (
                    <p className="text-xs">Wormhole fees: 0 USDC</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <Button
        className=" bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
        onClick={() => {
          if (!isValid) {
            toast("I thought you wanted to send something?");
            return;
          }
          dispatch(increment());
        }}
      >
        NEXT &gt;
      </Button>
    </div>
  );
}
