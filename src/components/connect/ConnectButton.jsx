import React, { useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAccount, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import ProfileDropdown from "../../utilities/ProfileDropdown";

const ConnectButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [connecting, setConnecting] = useState(false);
  const { open } = useAppKit();
  const handleLogin = () => {
    setConnecting(true);
    open();
  };
  useEffect(() => {
    if (connecting && isConnected && address) {
      handleLogin();
    }
  }, [connecting, isConnected, address]);

  if (!isConnected) {
    return (
      <PrimaryButton onClick={() => handleLogin()}>
        Connect Wallet
      </PrimaryButton>
    );
  }

  return (
    <ProfileDropdown
      position="left"
      triggerClassName="bg-white/7 backdrop-blur-lg gap-2 border-stroke-gray text-xs"
      labelClassName="text-dull-white"
      contentClassName="bg-white/7 backdrop-blur-lg border-1 border-stroke-gray text-xs"
    />
  );
};

export default ConnectButton;
