import { useWeb3Contract, useMoralis } from "react-moralis";
import { abi, contractAddress } from "../constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const raffleAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState(0);

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    // abi:abi,contractAddress:raffleAddress,functionName:'enterRaffle' ,params: {},msgValue:,
  });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall));
      }
      updateUI();
    }
  }, [isWeb3Enabled]);
  return (
    <div>
      Hi from lottery entrance!
      {raffleAddress ? (
        <div>Entrance Fee: {entranceFee} ETH</div>
      ) : (
        <div>No Raffle Address detected</div>
      )}
    </div>
  );
}
