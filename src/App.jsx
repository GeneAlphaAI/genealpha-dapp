import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Breeding from "./pages/breeding/Breeding";
import SwarmDAO from "./pages/swarm/SwarmDAO";
import Leaderboard from "./pages/leaderboard.jsx/Leaderboard";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  return (
    <div className="h-screen font-inter flex flex-col text-white">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="p-4 flex-grow overflow-y-auto">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/breeding" element={<Breeding />} />
            <Route path="/swarm" element={<SwarmDAO />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
