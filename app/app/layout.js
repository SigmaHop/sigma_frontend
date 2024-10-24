import ChainSelectorModal from "@/components/modal/ChainSelectorModal";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <ChainSelectorModal />
      {children}
    </div>
  );
}
