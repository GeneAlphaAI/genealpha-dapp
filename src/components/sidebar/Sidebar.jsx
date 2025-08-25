import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const sidebarLinks = [
    {
      label: "Live Models",
      pathname: "/",
      image: "/assets/sidebar/Brain.svg",
      disabled: false,
    },
    {
      label: "Infulencer Agent",
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
      disabled: true, // Example disabled link
    },
    {
      label: "SwarmDAO",
      pathname: "/swarm",
      image: "/assets/sidebar/Bee.svg",
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col w-[200px] md:min-w-[200px] 2xl:min-w-[250px] 2xl:w-[250px] h-full border-r-1 border-stroke-gray py-4 px-2">
      {sidebarLinks.map(({ label, pathname, image, disabled }) => {
        const isActive = location.pathname === pathname;

        const baseClasses = `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
          isActive ? "bg-white/7 text-white" : "text-dull-white"
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
  );
};

export default Sidebar;
