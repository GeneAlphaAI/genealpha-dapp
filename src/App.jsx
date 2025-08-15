import { useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MobileSidebar from "./components/sidebar/MobileSidebar"; // New!
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Breeding from "./pages/breeding/Breeding";
import SwarmDAO from "./pages/swarm/SwarmDAO";
import Leaderboard from "./pages/leaderboard.jsx/Leaderboard";
import Popup from "./components/Popups/Popup";
import HourGlassAnimation from "./components/Animations/HourGlassAnimation";
import PrimaryButton from "./components/buttons/PrimaryButton";
import LinkButton from "./components/buttons/LinkButton";
import InfluencerAgent from "./pages/influencer/InfluencerAgent";

function App() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen font-inter flex flex-col text-white">
      <Header
        onHamburgerClick={() => setIsDrawerOpen(!isDrawerOpen)}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={() => setIsDrawerOpen(false)}
      />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden 1xl:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar isOpen={isDrawerOpen} />

        <div className="p-4 flex-grow overflow-y-auto">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/breeding" element={<Breeding />} />
            <Route path="/swarm" element={<SwarmDAO />} />
            <Route path="/influencer" element={<InfluencerAgent />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
      </div>

      {/* <Popup>
        <button
          className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-[8px] bg-white/4 rounded-[3px] px-[10px] py-[4px] w-max h-[24px] transition-all ease-in hover:bg-white/5 cursor-pointer"
          onClick={() => {
            window.location.href = "https://genealpha.ai/";
          }}
        >
          <img
            src="/assets/general/back-button.svg"
            alt="back"
            className="w-[13px] h-auto"
          />
          <span className="font-jetbrains-mono font-medium  text-[11px] md:text-[12px] leading-[100%] text-low-opacity">
            Go Back
          </span>
        </button>
        <div className="flex flex-col items-center gap-[25px] text-center px-4 py-5 lg:py-5 lg:px-10">
          <HourGlassAnimation />
          <div>
            <h3 className="text-[20px] md:text-[22px] xl:text-[28px] font-semibold font-inter text-primary-text max-w-[32ch]">
              Hold tight, curious bee, the Hive is still buzzing with activity
              behind the scenes.
            </h3>
            <p className="text-secondary-text text-xs md:text-sm xl:text-md font-inter font-medium max-w-[40ch] mt-3">
              We'll open the doors the moment the Hive is ready. Until then,
              feel free to explore our docs or join the conversation with the
              community.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-7">
            <PrimaryButton
              textSize=" text-xs md:text-[16px]"
              textClassName="font-medium text-main-background"
              onClick={() => {
                window.location.href = "https://t.me/GeneAlphaAI";
                target = "_blank";
              }}
            >
              Join Community
            </PrimaryButton>
            <LinkButton
              textSize="text-xs md:text-[16px]"
              textClassName="flex items-center gap-2.5"
              onClick={() => {
                window.location.href = "https://t.me/GeneAlphaAI";
              }}
            >
              <span className="inline-block">Explore Docs</span>
              <img src="/assets/general/arrow-angle-right.svg" alt="read" />
            </LinkButton>
          </div>
        </div>
      </Popup> */}
    </div>
  );
}

export default App;
