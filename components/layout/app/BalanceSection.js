"use client";
import { chains } from "@/lib/config";
import { Button, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export default function BalanceSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected } = useAccount();

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
          <p className="text-4xl font-bold">0.00 USDC</p>
        </div>

        <div className="border border-[var(--primary)] mx-5 border-b-0"></div>

        {chains.map((chain) => (
          <div key={chain.id} className="flex justify-between p-5">
            <div className="text-xs flex flex-col gap-2">{chain.name}</div>
            <p className="text-2xl font-bold">0.00 USDC</p>
          </div>
        ))}
      </div>
      <Button
        className="mx-5 mb-5 bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
        onClick={() => {}}
      >
        Transfer &gt;
      </Button>
    </div>
  );
}
