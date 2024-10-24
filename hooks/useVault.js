"use client";

import { abis, chains } from "@/lib/config";
import { setAddress, setBalances } from "@/redux/slice/vaultSlice";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

export default function useVault() {
  const { address } = useAccount();
  const dispatch = useDispatch();

  const initializeVault = async () => {
    const initialChain = chains[0];
    const provider = new ethers.providers.JsonRpcProvider(initialChain.rpcUrl);

    const SigmaProxyFactory = new ethers.Contract(
      initialChain.deployments.SigmaProxyFactory,
      abis.SigmaProxyFactory,
      provider
    );

    const vaultAddress = await SigmaProxyFactory.getSigmaProxy(address);

    dispatch(setAddress(vaultAddress));

    return vaultAddress;
  };

  const initializeBalance = async () => {
    let balanceData = [];

    await Promise.all(
      chains.map(async (chain) => {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

        const SigmaProxyFactory = new ethers.Contract(
          chain.deployments.SigmaProxyFactory,
          abis.SigmaProxyFactory,
          provider
        );

        const vaultAddress = await SigmaProxyFactory.getSigmaProxy(address);

        const USDCToken = new ethers.Contract(
          chain.deployments.USDCToken,
          abis.IERC20,
          provider
        );

        const balance = await USDCToken.balanceOf(vaultAddress);

        balanceData.push({
          vaultAddress: vaultAddress,
          chainId: chain.chainId,
          balance,
        });
      })
    );

    dispatch(setBalances(balanceData));

    return balanceData;
  };

  const listenForBalance = async () => {
    let balanceData = await initializeBalance();

    console.log("Listening for balance changes...");

    await Promise.all(
      chains.map(async (chain) => {
        const wsProvider = new ethers.providers.WebSocketProvider(chain.wsUrl);

        const USDCToken = new ethers.Contract(
          chain.deployments.USDCToken,
          abis.IERC20,
          wsProvider
        );

        const vaultAddress = balanceData.find(
          (balance) => balance.chainId === chain.chainId
        ).vaultAddress;

        USDCToken.on("Transfer", async (from, to, value) => {
          if (from === vaultAddress || to === vaultAddress) {
            const currentBalance = await USDCToken.balanceOf(vaultAddress);

            const updatedBalanceData = balanceData.map((balance) => {
              if (balance.chainId === chain.chainId) {
                return {
                  ...balance,
                  balance: currentBalance,
                };
              } else {
                return balance;
              }
            });

            balanceData = updatedBalanceData;
            dispatch(setBalances(updatedBalanceData));
          }
        });
      })
    );
  };

  return { initializeVault, listenForBalance };
}
