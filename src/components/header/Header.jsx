import React from "react";
import Dropdown from "../../utilities/Dropdown";
import Refresh from "./Refresh";
import ModelStatus from "./ModelStatus";
import Balance from "./Balance";
import WalletAddress from "./WalletAddress";

const Header = () => {
  const options = [
    { label: "Ethereum", value: "eth" },
    { label: "Polygon", value: "polygon" },
    { label: "BNB", value: "bnb" },
  ];
  return (
    <div className="p-4 flex items-center gap-2 border-b-1 border-stroke-gray">
      <div className="flex items-center gap-2 min-w-[180px] 2xl:min-w-[250px]">
        <img
          src="/assets/logo/HiveLogo.svg"
          alt="Hive Logo"
          className="h-[24px]"
        />
        <h4 className="text-white text-sm font-semibold">Hive</h4>
      </div>
      <div className="w-full h-full flex items-center justify-between">
        <Dropdown
          options={options}
          holderText="Show Predictions: "
          icon="/assets/dashboard/DownArrow.svg"
          position="left"
          triggerClassName="bg-white/10 backdrop-blur-lg gap-2 border-stroke-gray text-xs"
          labelClassName="text-dull-white"
          contentClassName="bg-white/10 backdrop-blur-lg border-1 border-stroke-gray text-xs"
        />
        <div className="flex items-center gap-4">
          <Refresh duration={15} />
          <ModelStatus />
          <Balance />
          <WalletAddress />
        </div>
      </div>
    </div>
  );
};

export default Header;
