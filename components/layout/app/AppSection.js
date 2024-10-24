"use client";

import ConnectWalletButton from "@/components/ui/ConnectWalletButton";
import CopyAddressButton from "@/components/ui/CopyAddressButton";
import { FlipWords } from "@/components/ui/flip-words";
import QRCodeGenerator from "@/components/ui/QrCodeGenerator";
import { chains } from "@/lib/config";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import Step1 from "../steps/Step1";

export default function AppSection() {
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected } = useAccount();
  const vaultAddress = useSelector((state) => state.vault.address);
  const step = useSelector((state) => state.step.step);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
        <p>Seamlessly transfer USDC </p>
        <div className="pl-5 -mt-5">
          {" "}
          from
          <FlipWords
            words={[
              "Optismism,Avalanche,Base",
              "Optimism,Base",
              "Base",
              "Avalanche",
              "Optimism",
              "Base,Avalanche",
              "Avalanche",
            ]}
            className={"text-center font-bold"}
          />
          <br />
          to
          <FlipWords
            words={[
              "Base",
              "Avalanche",
              "Optimism,Avalanche",
              "Optimism,Avalanche,Base",
              "Avalanche,Base",
              "Optimism",
              "Base",
            ]}
            className={"text-center font-bold"}
          />
        </div>
        <ConnectWalletButton />
      </div>
    );
  }

  if (isConnected && step === 0) {
    return (
      <div className="flex flex-col items-center mt-5 h-full gap-5 text-center">
        <h2 className="text-xl font-bold">Your USDC Vault</h2>
        <p className="-mt-4">
          Deposit USDC to your vault <br /> to get started{" "}
        </p>
        <div className="w-[250px] h-[250px] mb-1">
          <QRCodeGenerator value={vaultAddress} />
        </div>

        <CopyAddressButton address={vaultAddress} />

        <div className="flex flex-col gap-2">
          Supported in
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
                  width={30}
                  height={30}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isConnected && step > 0) {
    return <>{step === 1 && <Step1 />}</>;
  }
}
