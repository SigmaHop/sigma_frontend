import { http, createConfig } from "wagmi";
import {
  avalancheFuji,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
} from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia, optimismSepolia, avalancheFuji],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [avalancheFuji.id]: http(),
  },
});
