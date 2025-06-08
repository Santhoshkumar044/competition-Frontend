import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("competitions");
  const [competitions, setCompetitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  useEffect(() => {
    const url = activeTab === "competitions" ? "/api/competitions" : "/api/events";
    fetch(url)
      .then(res => res.json())
      .then(data => (activeTab === "competitions" ? setCompetitions(data) : setEvents(data)))
      .catch(err => console.error(`Error fetching ${activeTab}:`, err));
  }, [activeTab]);

  return (
    <div className="min-h-screen font-['Inter'] bg-gradient-to-br from-[#0C001E] via-[#1A0033] to-[#0C001E] text-white px-8 py-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b border-cyan-400 pb-4">
        <div className="flex space-x-10 text-lg font-semibold">
          <button onClick={() => navigate("/")} className="hover:underline">Home</button>
          <button
            onClick={() => setActiveTab("competitions")}
            className={`transition duration-300 ${activeTab === "competitions" ? "text-cyan-400 underline underline-offset-4" : "hover:underline"}`}
          >
            Competitions
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`transition duration-300 ${activeTab === "events" ? "text-cyan-400 underline underline-offset-4" : "hover:underline"}`}
          >
            Events
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gradient-to-r from-[#2F0A50] to-[#1F002F] px-4 py-2 text-sm font-medium border border-cyan-300"
          >
            👤 <span className="text-cyan-300">{user?.name || "Loading..."}</span> ▼
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#2F0A50] border border-cyan-300 shadow-lg z-50 text-sm">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-cyan-800"
              >
                Edit Profile
              </button>
              <button
                onClick={() => (window.location.href = "/auth/logout")}
                className="w-full text-left px-4 py-2 hover:bg-cyan-800"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 bg-[#16002A]/80 p-6 border border-[#2e114d]">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white text-black px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-300"
          />
          <FaSearch className="absolute top-3.5 left-4 text-gray-500 text-sm" /> 
        </div>

        <div className="flex flex-wrap gap-4 items-center text-sm">
          <select className="bg-transparent border border-cyan-300 px-4 py-2 text-white">
            <option className="bg-[#1A0033] text-white">Status</option>
            <option className="bg-[#1A0033] text-white">Live</option>
            <option className="bg-[#1A0033] text-white">Expired</option>
            <option className="bg-[#1A0033] text-white">Recent</option>
          </select>

          <select className="bg-transparent border border-cyan-300 px-4 py-2 text-white">
            <option className="bg-[#1A0033] text-white">Sort By</option>
            <option className="bg-[#1A0033] text-white">Prize</option>
            <option className="bg-[#1A0033] text-white">Days Left</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#1A0033]/70 p-10 border border-[#2F0A50] text-center text-gray-300">
        {(activeTab === "competitions" ? competitions : events).length === 0 ? (
          <p className="text-lg italic tracking-wide">No {activeTab} yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === "competitions" ? competitions : events).map((item) => (
              <div
                key={item._id}
                className="bg-[#260040] p-6 border border-cyan-400 shadow-sm text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {activeTab === "competitions" ? item.eventName : item.name}
                </h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                <p className="mt-2 text-sm text-cyan-200">Date: {item.date}</p>
                <p className="text-sm text-cyan-200">Venue: {item.venue}</p>
                <div className="mt-4 flex gap-2">
                  <button className="bg-cyan-600 hover:bg-cyan-600 px-3 py-1 text-sm border border-green-700">
                    Register
                  </button>
                  {item.source === "web" && activeTab === "competitions" && (
                    <button className="bg-cyan-600 hover:bg-cyan-600 px-3 py-1 text-sm border border-yellow-700">
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
