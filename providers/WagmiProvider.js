"use client";

import { WagmiProvider as Wagmi } from "wagmi";
import { config } from "../utils/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function WagmiProvider({ children }) {
  return (
    <Wagmi config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Wagmi>
  );
}
