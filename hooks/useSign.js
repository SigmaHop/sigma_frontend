"use client";

import { abis, chains } from "@/lib/config";
import { setDeadline, setSignature } from "@/redux/slice/transactionSlice";
import { useEthersSigner } from "@/utils/ethersSigner";
import axios from "axios";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";

export default function useSign() {
  const signer = useEthersSigner();
  const fromChains = useSelector((state) => state.selector.fromChains);
  const toChains = useSelector((state) => state.selector.toChains);
  const amounts = useSelector((state) => state.selector.amounts);
  const recipients = useSelector((state) => state.selector.recipients);
  const dispatch = useDispatch();

  const sign = async () => {
    if (
      fromChains.length === 1 &&
      toChains.length === 1 &&
      fromChains[0] === toChains[0]
    ) {
      const chain = chains.find((c) => c.chainId === fromChains[0]);
      const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

      const sigmaForwarder = new ethers.Contract(
        chain.deployments.SigmaForwarder,
        abis.SigmaForwarder,
        provider
      );

      const nonce = await sigmaForwarder.nonces(signer._address);

      const forwarderSigner = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transfer/signer`
      );

      const executor = forwarderSigner.data.address;

      const executorNonce = await sigmaForwarder.nonces(executor);

      const amount = amounts.find((a) => a.chainId === chain.chainId).amount;
      const recipient = recipients.find((r) => r.chainId === chain.chainId)
        .address;

      const domainType =
        "EIP712Domain(string name,string version,uint16 chainId,uint256 nonce)";

      const domainHashInput = ethers.utils.defaultAbiCoder.encode(
        ["bytes32", "bytes32", "bytes32", "uint16", "uint256"],
        [
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domainType)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sigma Forwarder")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1")),
          chain.wormhole.chainId,
          executorNonce,
        ]
      );

      const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

      const domainSeparator = ethers.utils.keccak256(domainHashInput);

      const structType =
        "TransferTokensLocal(address to,uint256 amount,uint256 deadline,uint256 nonce)";
      const structHash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ["bytes32", "address", "uint256", "uint256", "uint256"],
          [
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes(structType)),
            recipient,
            Number(amount * 10 ** 6).toFixed(0),
            deadline,
            Number(nonce),
          ]
        )
      );

      const digest = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["string", "bytes32", "bytes32"],
          ["\x19\x01", domainSeparator, structHash]
        )
      );

      const signature = await signer.signMessage(ethers.utils.arrayify(digest));

      dispatch(setDeadline(deadline));

      dispatch(setSignature(signature));
    } else if (
      (fromChains.length === 1 && toChains.length > 1) ||
      (fromChains.length === 1 &&
        toChains.length === 1 &&
        fromChains[0] !== toChains[0])
    ) {
      const chain = chains.find((c) => c.chainId === fromChains[0]);
      const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

      const sigmaForwarder = new ethers.Contract(
        chain.deployments.SigmaForwarder,
        abis.SigmaForwarder,
        provider
      );

      const nonce = await sigmaForwarder.nonces(signer._address);

      const forwarderSigner = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transfer/signer`
      );

      const executor = forwarderSigner.data.address;

      console.log(executor);

      const executorNonce = await sigmaForwarder.nonces(executor);

      const Amounts = toChains.map((c) => {
        return amounts.find((a) => a.chainId === c).amount;
      });

      const Recipients = toChains.map((c) => {
        return recipients.find((r) => r.chainId === c).address;
      });

      const recipientChains = toChains.map((c) => {
        return chains.find((chain) => chain.chainId === c).wormhole.chainId;
      });

      const domainType =
        "EIP712Domain(string name,string version,uint16[] chainIds,uint256 nonce)";

      const domainHashInput = ethers.utils.defaultAbiCoder.encode(
        ["bytes32", "bytes32", "bytes32", "uint16[]", "uint256"],
        [
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(domainType)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Sigma Forwarder")),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1")),
          recipientChains,
          executorNonce,
        ]
      );

      const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

      const domainSeparator = ethers.utils.keccak256(domainHashInput);

      const structType =
        "SingleToMultiTransferToken(address sigmaHop,address[] tos,uint256[] amounts,uint16[] destChains,uint256 deadline,uint256 nonce)";

      const structHash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          [
            "bytes32",
            "address",
            "address[]",
            "uint256[]",
            "uint16[]",
            "uint256",
            "uint256",
          ],
          [
            ethers.utils.keccak256(ethers.utils.toUtf8Bytes(structType)),
            chain.deployments.SigmaHop,
            Recipients,
            Amounts.map((a) => Number(a * 10 ** 6).toFixed(0)),
            recipientChains,
            deadline,
            nonce,
          ]
        )
      );

      const digest = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["string", "bytes32", "bytes32"],
          ["\x19\x01", domainSeparator, structHash]
        )
      );

      const signature = await signer.signMessage(ethers.utils.arrayify(digest));

      dispatch(setDeadline(deadline));

      dispatch(setSignature(signature));
    }
  };

  return { sign };
}
