import { useState } from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MobileSidebar from "./components/sidebar/MobileSidebar"; // New!
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Breeding from "./pages/breeding/Breeding";
import SwarmDAO from "./pages/swarm/SwarmDAO";
import Leaderboard from "./pages/leaderboard.jsx/Leaderboard";
import InfluencerAgent from "./pages/influencer/InfluencerAgent";
import { useAccount } from "wagmi";
import ConnectWalletPlaceholder from "./components/connect/ConnectWalletPlaceholder";
import Training from "./pages/training/Training";
import Profile from "./pages/profile/Profile";
import WorkInProgress from "./components/training/WorkInProgress";

function App() {
  const location = useLocation();
  const { isConnected } = useAccount();
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
          {!isConnected ? (
            <div className="flex w-full h-full items-center justify-center">
              <ConnectWalletPlaceholder />
            </div>
          ) : (
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/breeding" element={<Breeding />} />
              <Route path="/swarm" element={<SwarmDAO />} />
              <Route path="/influencer" element={<InfluencerAgent />} />
              <Route path="/training" element={<WorkInProgress />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
