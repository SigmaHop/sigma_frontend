import ChainSelectorModal from "@/components/modal/ChainSelectorModal";
import LoadingScreenModal from "@/components/modal/LoadingScreen";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <ChainSelectorModal />
      <LoadingScreenModal />
      {children}
    </div>
  );
}
