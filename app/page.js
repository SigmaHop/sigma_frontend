import ConnectWalletButton from "@/components/ui/ConnectWalletButton";
import { FlipWords } from "@/components/ui/flip-words";
import SigmaBoxAnimation from "@/components/ui/SigmaBoxAnimation";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden flex justify-between items-center p-20">
      <div className="relative w-1/2">
        <div className="absolute w-full h-full">
          <SigmaBoxAnimation />
        </div>
      </div>

      <div className="flex-1">
        <div className="w-full h-full flex flex-col items-center gap-5 text-center">
          <h1 className="font-bold text-6xl">SIGMA HOP</h1>
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

          <ConnectWalletButton switchButton />
        </div>
      </div>
    </div>
  );
}
