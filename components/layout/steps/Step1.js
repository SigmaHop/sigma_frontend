"use client";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import ChainSelector from "./deps/ChainSelector";
import { toast } from "sonner";
import { increment } from "@/redux/slice/stepSlice";

export default function Step1() {
  const dispatch = useDispatch();
  const fromChains = useSelector((state) => state.selector.fromChains);
  const toChains = useSelector((state) => state.selector.toChains);

  return (
    <div className="p-5 flex flex-col justify-between h-full w-full">
      <div className="flex flex-col flex-1 w-full gap-2">
        <h2 className="font-bold text-xl text-center">Select Chain</h2>

        <p>From</p>

        <ChainSelector
          fromChains={fromChains}
          toChains={toChains}
          mode="from"
        />

        <p className="mt-5">To</p>

        <ChainSelector fromChains={fromChains} toChains={toChains} mode="to" />
      </div>
      <Button
        className=" bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
        onClick={() => {
          if (fromChains.length === 0 || toChains.length === 0) {
            toast("Trying to send to nowhere?");
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
