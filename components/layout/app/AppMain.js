import AppSection from "./AppSection";
import BalanceSection from "./BalanceSection";

export default function AppMain() {
  return (
    <div className="h-screen w-screen flex flex-col items-center mt-10 gap-10">
      <h1 className="text-4xl font-bold">SIGMA HOP</h1>
      <div className="flex items-center gap-5">
        <BalanceSection />
        <div className="w-[400px] bg-black border border-[var(--primary)] h-[550px]">
          <AppSection />
        </div>
      </div>
    </div>
  );
}
