import { ethers } from "ethers";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyAddressButton({ address }) {
  return (
    <button
      onClick={() => {
        if (!address) return;
        navigator.clipboard.writeText(address);
        toast("Address copied to clipboard");
      }}
      className="bg-black border border-[var(--primary)] flex items-center gap-2 text-[var(--primary)] px-5 py-2"
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : `${ethers.constants.AddressZero.slice(
            0,
            6
          )}...${ethers.constants.AddressZero.slice(-4)}`}
      <Copy size={15} />
    </button>
  );
}
