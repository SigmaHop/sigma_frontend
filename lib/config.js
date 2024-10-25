import OpenBatchExecutorABI from "./contracts/OpenBatchExecutor.json";
import SigmaForwarderABI from "./contracts/SigmaForwarder.json";
import SigmaHopABI from "./contracts/SigmaHop.json";
import SigmaProxyFactoryABI from "./contracts/SigmaProxyFactory.json";
import SigmaUSDCVaultABI from "./contracts/SigmaUSDCVault.json";
import IERC20ABI from "./contracts/IERC20.json";

const chains = [
  {
    name: "Optimism Sepolia",
    chainId: 11155420,
    rpcUrl:
      "https://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
    explorerURL: "https://sepolia-optimism.etherscan.io",
    wsUrl: "wss://optimism-sepolia.gateway.tenderly.co/6OIbpnczqr3Y4ilSdXVIOF",
    converstionId: 1027,
    usdcId: 3408,
    wormhole: {
      chainId: 10005,
    },
    utils: {
      baseGas: 0,
      cautionGas: 15000,
    },
    deployments: {
      OpenBatchExecutor: "0x7a4A0e89e041a24550d644fa8387DbeaFE444A3E",
      SigmaForwarder: "0xD45C8C9C6d0994E3E8d5c891749C675ffaF2f481",
      SigmaHop: "0x695Da91D1d62576455015a837645D1f2d318aA0c",
      SigmaProxyFactory: "0xaEeFD7Ce278b113a3dE2be8e59719D399d117394",
      SigmaUSDCVault: "0xCa8cb572cA074851dFF02a9089f75C914da8d6e2",
      USDCToken: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
    },
    logo: "/tokens/op-logo.svg",
  },
  {
    name: "Base Sepolia",
    chainId: 84532,
    rpcUrl: "https://sepolia.base.org",
    explorerURL: "https://sepolia.basescan.org",
    wsUrl: "wss://base-sepolia-rpc.publicnode.com",
    converstionId: 1027,
    usdcId: 3408,
    wormhole: {
      chainId: 10004,
    },
    utils: {
      baseGas: 0,
      cautionGas: 15000,
    },
    deployments: {
      OpenBatchExecutor: "0x7a4A0e89e041a24550d644fa8387DbeaFE444A3E",
      SigmaForwarder: "0xD45C8C9C6d0994E3E8d5c891749C675ffaF2f481",
      SigmaHop: "0x695Da91D1d62576455015a837645D1f2d318aA0c",
      SigmaProxyFactory: "0xaEeFD7Ce278b113a3dE2be8e59719D399d117394",
      SigmaUSDCVault: "0xCa8cb572cA074851dFF02a9089f75C914da8d6e2",
      USDCToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    },
    logo: "/tokens/base-logo.svg",
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    rpcUrl: "https://rpc.ankr.com/avalanche_fuji",
    explorerURL: "https://testnet.snowtrace.dev",
    wsUrl: "wss://avalanche-fuji-c-chain-rpc.publicnode.com",
    converstionId: 5805,
    usdcId: 3408,
    wormhole: {
      chainId: 6,
    },
    utils: {
      baseGas: 0,
      cautionGas: 15000,
    },
    deployments: {
      OpenBatchExecutor: "0x7a4A0e89e041a24550d644fa8387DbeaFE444A3E",
      SigmaForwarder: "0xD45C8C9C6d0994E3E8d5c891749C675ffaF2f481",
      SigmaHop: "0x3D6513fd0f25FC45E91CeDeC0a387734846cFc99",
      SigmaProxyFactory: "0xaEeFD7Ce278b113a3dE2be8e59719D399d117394",
      SigmaUSDCVault: "0xCa8cb572cA074851dFF02a9089f75C914da8d6e2",
      USDCToken: "0x5425890298aed601595a70ab815c96711a31bc65",
    },
    logo: "/tokens/avax-logo.svg",
  },
];

const abis = {
  OpenBatchExecutor: OpenBatchExecutorABI,
  SigmaForwarder: SigmaForwarderABI,
  SigmaHop: SigmaHopABI,
  SigmaProxyFactory: SigmaProxyFactoryABI,
  SigmaUSDCVault: SigmaUSDCVaultABI,
  IERC20: IERC20ABI,
};

export { chains, abis };
