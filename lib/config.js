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
    rpcUrl: "https://sepolia.optimism.io",
    explorerURL: "https://sepolia-optimism.etherscan.io",
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
      SigmaForwarder: "0xB635D451784F79cb13AC67504f0FBD84b5e3ad99",
      SigmaHop: "0x695Da91D1d62576455015a837645D1f2d318aA0c",
      SigmaProxyFactory: "0x7C0A146e6ee09cAeb1229F4f22c67396Ac76c5d5",
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
      SigmaForwarder: "0xB635D451784F79cb13AC67504f0FBD84b5e3ad99",
      SigmaHop: "0x695Da91D1d62576455015a837645D1f2d318aA0c",
      SigmaProxyFactory: "0x7C0A146e6ee09cAeb1229F4f22c67396Ac76c5d5",
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
      SigmaForwarder: "0x695Da91D1d62576455015a837645D1f2d318aA0c",
      SigmaHop: "0x3D6513fd0f25FC45E91CeDeC0a387734846cFc99",
      SigmaProxyFactory: "0x7C0A146e6ee09cAeb1229F4f22c67396Ac76c5d5",
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
