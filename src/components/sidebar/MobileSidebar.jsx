import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../utilities/Dropdown";
import Refresh from "../header/Refresh";
import ModelStatus from "../header/ModelStatus";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/slices/token";
import useTokenBalance from "../../utilities/useTokenBalance";

const MobileSidebar = ({ isOpen }) => {
  const location = useLocation();
  const { balance } = useTokenBalance(
    "0x5e6dd9a767894470e7e93e603c25f681a5adf1ae"
  );

  const sidebarLinks = [
    {
      label: "Live Models",
      pathname: "/",
      image: "/assets/sidebar/Brain.svg",
      disabled: false,
    },
    {
      label: "Influencer Agent",
      pathname: "/influencer",
      image: "/assets/sidebar/InfluencerAgent.svg",
      disabled: false,
    },
    {
      label: "Training",
      pathname: "/training",
      image: "/assets/sidebar/Training.svg",
      disabled: false,
    },
    {
      label: "Leaderboard",
      pathname: "/leaderboard",
      image: "/assets/sidebar/Trophy.svg",
      disabled: true,
    },
    {
      label: "Breeding",
      pathname: "/breeding",
      image: "/assets/sidebar/Dna.svg",
      disabled: true, // Example disabled
    },
    {
      label: "SwarmDAO",
      pathname: "/swarm",
      image: "/assets/sidebar/Bee.svg",
      disabled: true,
    },
  ];

  const { options, selectedToken } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-[64px] left-0 h-[calc(100%-64px)] w-full z-40 bg-primary/80 backdrop-blur-lg p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } 1xl:hidden`}
    >
      <div className="flex lg:hidden flex-col border-b-[0.5px] border-stroke-gray mb-4">
        <h3 className="text-md font-jetbrains-mono text-low-opacity">
          GA Balance
        </h3>
        <p className="text-lg font-jetbrains-mono">
          {Number((Number(balance) / 10 ** 18).toFixed(3)) || 0}
        </p>
      </div>

      <div className="border-b-[0.5px] border-stroke-gray pb-4">
        <Dropdown
          options={options}
          selectedValue={selectedToken}
          onSelect={(value) => dispatch(selectToken(value))}
          holderText="Show Predictions: "
          icon="/assets/dashboard/DownArrow.svg"
          position="left"
          triggerClassName="bg-[#222121] gap-2 w-full text-xs"
          labelClassName="text-dull-white"
          contentClassName="bg-[#222121] backdrop-blur-lg text-xs"
        />
        <div className="flex lg:hidden w-full border-1 rounded-sm border-stroke-gray mt-3 justify-evenly">
          <div className="bg-white/5 w-full flex items-center justify-center rounded-l-sm py-1">
            <Refresh />
          </div>
          <div className="bg-white/5 w-full flex items-center border-l-1 border-stroke-gray py-1 justify-center rounded-r-sm">
            <ModelStatus />
          </div>
        </div>
      </div>

      <div className="mt-3">
        {sidebarLinks.map(({ label, pathname, image, disabled }) => {
          const isActive = location.pathname === pathname;

          const baseClasses = `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
            isActive ? "bg-white/10 text-white" : "text-dull-white"
          }`;

          const disabledClasses =
            "opacity-50 cursor-not-allowed text-low-opacity";

          if (disabled) {
            return (
              <div key={label} className={`${baseClasses} ${disabledClasses}`}>
                <img src={image} alt={label} className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </div>
            );
          }

          return (
            <Link key={label} to={pathname} className={baseClasses}>
              <img src={image} alt={label} className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSidebar;
