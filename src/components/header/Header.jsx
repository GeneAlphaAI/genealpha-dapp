import React from "react";
import Dropdown from "../../utilities/Dropdown";
import Refresh from "./Refresh";
import ModelStatus from "./ModelStatus";
import Balance from "./Balance";
import WalletAddress from "./WalletAddress";
import ProfileDropdown from "../../utilities/ProfileDropdown";

const Header = ({ onHamburgerClick, isDrawerOpen, onCloseDrawer }) => {
  const options = [
    { label: "Ethereum", value: "eth" },
    { label: "Polygon", value: "polygon" },
    { label: "BNB", value: "bnb" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-dark-gray p-4 flex items-center gap-2 border-b-1 border-stroke-gray">
      <div className="flex items-center gap-2 md:min-w-[180px] 2xl:min-w-[250px]">
        <img
          src="/assets/logo/HiveLogo.svg"
          alt="Hive Logo"
          className="h-[24px]"
        />
        <h4 className="text-white text-sm font-semibold">Hive</h4>
      </div>

      <div className="w-full h-full flex items-center gap-4 justify-end 1xl:justify-between">
        <div className="hidden 1xl:block">
          <Dropdown
            options={options}
            holderText="Show Predictions: "
            icon="/assets/dashboard/DownArrow.svg"
            position="left"
            triggerClassName="bg-white/10 w-[240px] gap-2 text-xs"
            labelClassName="text-dull-white"
            contentClassName="bg-white/10 backdrop-blur-lg text-xs"
          />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Refresh duration={15} />
          <ModelStatus />
          <Balance />

          <ProfileDropdown
            icon="/assets/dashboard/DownArrow.svg"
            position="left"
            triggerClassName="bg-white/10 backdrop-blur-lg gap-2 border-stroke-gray text-xs"
            labelClassName="text-dull-white"
            contentClassName="bg-white/10 backdrop-blur-lg border-1 border-stroke-gray text-xs"
          />
        </div>

        <div className="flex 1xl:hidden items-center gap-4">
          <div className="block lg:hidden">
            <ProfileDropdown
              icon="/assets/dashboard/DownArrow.svg"
              position="left"
              triggerClassName="bg-white/10 backdrop-blur-lg gap-2 border-stroke-gray text-xs"
              labelClassName="text-dull-white"
              contentClassName="bg-white/10 backdrop-blur-lg border-1 border-stroke-gray text-xs"
            />
          </div>

          {/* Animated Menu/Close Button */}
          <button
            onClick={isDrawerOpen ? onCloseDrawer : onHamburgerClick}
            className="relative w-6 h-6 focus:outline-none"
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute left-0 top-1/2 w-5 h-[1px] bg-white transition-all duration-300 ease-in-out ${
                isDrawerOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 w-5 h-[1px] bg-white transition-opacity duration-300 ${
                isDrawerOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 w-5 h-[1px] bg-white transition-all duration-300 ease-in-out ${
                isDrawerOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
