"use client";
import { chains } from "@/lib/config";
import { Button, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import formatAmount from "@/lib/formatAmount";
import { increment, resetStep } from "@/redux/slice/stepSlice";

export default function BalanceSection() {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected } = useAccount();
  const balanceData = useSelector((state) => state.vault.balances);
  const totalBalance =
    balanceData && balanceData.length > 0
      ? balanceData.reduce((acc, data) => acc + Number(data.balance), 0)
      : 0;

  const step = useSelector((state) => state.step.step);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isConnected) return null;

  return (
    <div className="w-[400px] bg-black border flex flex-col justify-between border-[var(--primary)] h-[550px]">
      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-between p-5">
          <div className="text-sm flex flex-col gap-2">
            Balance
            <div className="flex gap-2 items-center justify-center">
              {chains.map((chain) => (
                <Tooltip
                  color="light"
                  className="p-0"
                  content={
                    <div className="border border-[var(--primary)] text-[var(--primary)] p-2">
                      <p>{chain.name}</p>
                    </div>
                  }
                >
                  <Image
                    key={chain.id}
                    src={chain.logo}
                    alt={chain.name}
                    width={15}
                    height={20}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
          <p className="text-4xl font-bold">
            {totalBalance.toString() === "0"
              ? "0.00"
              : formatAmount(totalBalance / 10 ** 6, 2)}{" "}
            USDC
          </p>
        </div>

        <div className="border border-[var(--primary)] mx-5 border-b-0"></div>

        {chains.map((chain) => {
          const currentBalanceData =
            balanceData &&
            balanceData.length > 0 &&
            balanceData.find((data) => data.chainId === chain.chainId);

          const balance = currentBalanceData
            ? formatAmount(Number(currentBalanceData.balance) / 10 ** 6, 2)
            : "0.00";

          return (
            <div key={chain.name} className="flex justify-between p-5">
              <div className="text-xs flex flex-col gap-2">{chain.name}</div>
              <p className="text-2xl font-bold">
                {currentBalanceData
                  ? balance.toString() !== "0"
                    ? balance
                    : "0.00"
                  : "0.00"}{" "}
                USDC
              </p>
            </div>
          );
        })}
      </div>
      {step === 0 && (
        <Button
          className="mx-5 mb-5 bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Transfer &gt;
        </Button>
      )}

      {step > 0 && (
        <Button
          className="mx-5 mb-5 bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
          onClick={() => {
            dispatch(resetStep());
          }}
        >
          Cancel X
        </Button>
      )}
    </div>
  );
}
