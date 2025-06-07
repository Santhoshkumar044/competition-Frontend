import React from "react";
import { useNavigate } from "react-router-dom";

export default function SlideOutMenu({ onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // close menu after navigation
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-[#1A0033] rounded-xl shadow-xl z-50 border border-cyan-300 text-white backdrop-blur-md">
      <button
        onClick={() => handleNavigate("/admin-dashboard")}
        className="block w-full text-left px-6 py-3 hover:bg-cyan-900/30"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigate("/profile")}
        className="block w-full text-left px-6 py-3 hover:bg-cyan-900/30"
      >
        Edit Profile
      </button>
      <button
        onClick={() => handleNavigate("/home")}
        className="block w-full text-left px-6 py-3 hover:bg-cyan-900/30 text-red-400"
      >
        Sign Out
      </button>
    </div>
  );
}
