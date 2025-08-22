import React from "react";

const ConnectWalletPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[25px]">
      <img src="/assets/dashboard/Plug.svg" />
      <div className="w-full text-center flex flex-col gap-[10px]">
        <h1 className="text-md text-primary-text font-medium">
          Connect Your Wallet
        </h1>
        <p className="text-sm text-low-opacity text-center max-w-[60ch]">
          Connect your wallet to access the hive and unlock amazing experiences
          tailored just for you.
        </p>
      </div>
    </div>
  );
};

export default ConnectWalletPlaceholder;
