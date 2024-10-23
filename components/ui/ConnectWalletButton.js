"use client";

import { toggleConnectModal } from "@/redux/slice/modalSlice";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function ConnectWalletButton({ switchButton = false }) {
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return isConnected && switchButton ? (
    <Button
      className="bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
      onClick={() => {
        router.push("/app");
      }}
    >
      Launch App &gt;
    </Button>
  ) : (
    <Button
      className="bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
      onClick={() => {
        dispatch(toggleConnectModal());
      }}
    >
      Connect Wallet
    </Button>
  );
}
