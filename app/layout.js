import "./globals.css";
import WagmiProvider from "@/providers/WagmiProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Space_Mono } from "next/font/google";
import FloatingCharacters from "@/components/ui/FloatingCharacters";
import ConnectWalletModal from "@/components/modal/ConnectWalletModal";
import { Toaster } from "sonner";
import WalletProvider from "@/providers/WalletProvider";

const spaceMono = Space_Mono({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} antialiased`}>
        <ReduxProvider>
          <WagmiProvider>
            <WalletProvider>
              <Toaster
                position="bottom-center"
                richColors
                toastOptions={{
                  className: `flex items-center justify-center text-center rounded-none bg-black text-[var(--primary)] border border-[var(--primary)] ${spaceMono.className}`,
                }}
              />
              <ConnectWalletModal />
              <FloatingCharacters />
              {children}
            </WalletProvider>
          </WagmiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
