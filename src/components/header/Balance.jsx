import React from "react";
import { useAccount } from "wagmi";
import useTokenBalance from "../../utilities/useTokenBalance";

const Balance = () => {
  const { isConnected } = useAccount();
  const { balance } = useTokenBalance(
    "0x5e6dd9a767894470e7e93e603c25f681a5adf1ae"
  );
  if (!isConnected) return;
  return (
    <div className="bg-white/7 flex items-center rounded-sm h-[2.2rem] px-4 gap-1 text-xs text-dull-white">
      <h4>{Number((Number(balance) / 10 ** 18).toFixed(3)) || 0}</h4>
      <span className="font-semibold"> GA</span>
    </div>
  );
};

export default Balance;
