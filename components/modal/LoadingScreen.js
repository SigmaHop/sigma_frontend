"use client";

import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBody } from "@material-tailwind/react";
import Image from "next/image";

export default function LoadingScreenModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.transaction.loading);

  const handleDrawer = () => {};

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
      <DialogBody className="text-[var(--primary)] flex flex-col items-center justify-center gap-y-4 py-5 font-outfit rounded-none border-[var(--primary)] w-full max-w-[24rem] px-5 pb-6">
        <Image
          src="/SigmaLogo.svg"
          alt="loading"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </DialogBody>
    </Dialog>
  );
}
