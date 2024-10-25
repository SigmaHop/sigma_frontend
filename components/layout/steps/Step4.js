"use client";

import useSign from "@/hooks/useSign";
import { chains } from "@/lib/config";
import { Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useGas from "@/hooks/useGas";
import formatAmount from "@/lib/formatAmount";
import { toast } from "sonner";
import useExecute from "@/hooks/useExecute";

export default function Step4() {
  const fromChains = useSelector((state) => state.selector.fromChains);
  const signature = useSelector((state) => state.transaction.signature);
  const { sign } = useSign();
  const { estimateGas } = useGas();
  const gasEstimates = useSelector((state) => state.transaction.gas);
  const dispatch = useDispatch();
  const { execute } = useExecute();

  let isValid = false;

  useEffect(() => {
    if (signature) {
      estimateGas();
    }
  }, [signature]);
  return (
    <div className="p-5 flex flex-col justify-between h-full w-full">
      <div className="flex flex-col flex-1 w-full gap-2">
        {fromChains.map((chain) => {
          const currentChain = chains.find((c) => c.chainId === chain);
          const currentEstimates = gasEstimates.find(
            (g) => g.chainId === chain
          );

          isValid = isValid || currentEstimates?.gasEstimates?.estimateFees;

          return (
            <div
              key={chain}
              className="flex flex-col border border-[var(--primary)] text-xs p-2 gap-2"
            >
              <p className="">{currentChain.name}</p>

              <div className="flex justify-between items-center">
                <p>Wormhole fees:</p>
                <p>
                  {" "}
                  {currentEstimates?.gasEstimates
                    ? currentEstimates?.gasEstimates?.hopUSDCFees
                      ? formatAmount(
                          currentEstimates?.gasEstimates?.hopUSDCFees /
                            10 ** 18,
                          5
                        )
                      : "0.00"
                    : "-.--"}{" "}
                  USDC
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p>Gas fees:</p>
                <p>
                  {currentEstimates?.gasEstimates
                    ? formatAmount(
                        currentEstimates?.gasEstimates?.estimateFees / 10 ** 18,
                        5
                      )
                    : "-.--"}{" "}
                  USDC
                </p>
              </div>
            </div>
          );
        })}

        {!signature && (
          <p className="text-center text-xs">
            Sign the payload to estimate gas fees.
          </p>
        )}
      </div>

      {!signature && (
        <Button
          className=" bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
          onClick={() => {
            sign();
          }}
        >
          SIGN &gt;
        </Button>
      )}

      {signature && (
        <Button
          className=" bg-transparent border border-[var(--primary)] rounded-none text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-colors duration-300"
          onClick={() => {
            if (!isValid) {
              toast("Seems like you are out of Gas. Please try again later.");
              return;
            }
            execute();
          }}
        >
          Execute &gt;
        </Button>
      )}
    </div>
  );
}
