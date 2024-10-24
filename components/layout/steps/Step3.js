"use client";

import { chains } from "@/lib/config";
import { setRecipientByChainId } from "@/redux/slice/selectorSlice";
import { increment } from "@/redux/slice/stepSlice";
import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function Step3() {
  const toChains = useSelector((state) => state.selector.toChains);
  const dispatch = useDispatch();
  let isValid = false;
  const recipients = useSelector((state) => state.selector.recipients);

  return (
    <div className="p-5 flex flex-col justify-between h-full w-full">
      <div className="flex flex-col flex-1 w-full gap-2">
        <h2 className="font-bold text-xl text-center">Set Recipient</h2>

        {toChains &&
          toChains.map((chain) => {
            const currentChain = chains.find((c) => c.chainId === chain);
            const recipient = recipients.find((r) => r.chainId === chain)
              .address;

            const setRecipient = (e) => {
              dispatch(
                setRecipientByChainId({
                  chainId: chain,
                  address: e.target.value,
                })
              );
            };

            isValid = ethers.utils.isAddress(recipient);

            return (
              <div key={chain} className="flex flex-col gap-2 mt-2">
                <p className="text-xs">To {currentChain.name}</p>
                <input
                  className="border border-[var(--primary)] bg-black rounded-none p-2 outline-none"
                  placeholder="Recipient Address"
                  value={recipient}
                  onChange={setRecipient}
                />
              </div>
            );
          })}
      </div>

      <Button
        className=" bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
        onClick={() => {
          if (!isValid) {
            toast("Seems like you're missing something");
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
