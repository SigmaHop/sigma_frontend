import { FlipWords } from "@/components/ui/flip-words";
import FloatingCharacters from "@/components/ui/FloatingCharacters";
import SigmaBoxAnimation from "@/components/ui/SigmaBoxAnimation";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden flex justify-between items-center p-20">
      <FloatingCharacters />
      <div className="relative w-1/2">
        <div className="absolute w-full h-full">
          <SigmaBoxAnimation />
        </div>
      </div>

      <div className="flex-1">
        <div className="w-full h-full flex flex-col items-center gap-2 text-center">
          <h1 className="font-bold text-6xl">SIGMA HOP</h1>
          <p>
            Seamlessly transfer USDC <br />{" "}
            <span className="pl-5">
              {" "}
              from
              <FlipWords
                words={[
                  "Avalanche",
                  "Optimism",
                  "Base",
                  "Optimism,Base",
                  "Base",
                  "Optismism,Avalanche,Base",
                ]}
                className={"text-center"}
              />
              <br />
              to
              <FlipWords
                words={[
                  "Optimism",
                  "Base",
                  "Avalanche",
                  "Avalanche",
                  "Optimism,Avalanche",
                  "Base",
                ]}
                className={"text-center"}
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
