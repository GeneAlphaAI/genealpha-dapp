import { useAccount, useReadContract } from "wagmi";
import { ContractABI } from "../components/context/ContractABI";

const useTokenBalance = (contractAddress) => {
  const { address } = useAccount();

  const {
    data: balance,
    isError,
    isFetched,
  } = useReadContract({
    abi: ContractABI,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address],
    enabled: Boolean(contractAddress), // Ensures the hook only runs if both are valid
  });

  const { data: decimals } = useReadContract({
    address: contractAddress,
    abi: ContractABI,
    functionName: "decimals",
    enabled: Boolean(contractAddress),
  });
  return { balance, isError, isFetched, decimals };
};

export default useTokenBalance;
