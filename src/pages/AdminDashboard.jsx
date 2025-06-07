import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SlideOutMenu from "../components/SlideOutMenu";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("competitions");
  const [menuOpen, setMenuOpen] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  useEffect(() => {
    if (activeTab === "competitions") {
      fetch("/api/competitions")
        .then(res => res.json())
        .then(data => setCompetitions(data))
        .catch(err => console.error("Error fetching competitions:", err));
    } else {
      fetch("/api/events")
        .then(res => res.json())
        .then(data => setEvents(data))
        .catch(err => console.error("Error fetching events:", err));
    }
  }, [activeTab]);

  const deleteItem = (type, id) => {
    fetch(`/api/${type}/${id}`, { method: "DELETE" })
      .then(() => {
        if (type === "competitions") {
          setCompetitions(prev => prev.filter(item => item._id !== id));
        } else {
          setEvents(prev => prev.filter(item => item._id !== id));
        }
      })
      .catch(err => console.error("Error deleting item:", err));
  };

  return (
    <div className="min-h-screen font-['Inter'] bg-gradient-to-br from-[#0C001E] via-[#1A0033] to-[#0C001E] text-white px-8 py-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 border-b border-cyan-400 pb-4">
        <div className="flex space-x-10 text-lg font-medium uppercase tracking-wide">
          <button onClick={() => navigate("/home")} className="hover:underline">Home</button>
          <button onClick={() => setActiveTab("competitions")} className={`${activeTab === "competitions" ? "text-cyan-400 underline underline-offset-4" : ""} hover:underline`}>Competitions</button>
          <button onClick={() => setActiveTab("events")} className={`${activeTab === "events" ? "text-cyan-400 underline underline-offset-4" : ""} hover:underline`}>Events</button>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gradient-to-r from-[#2F0A50] to-[#1F002F] px-5 py-2 border border-cyan-300 font-medium shadow text-sm tracking-wide"
          >
            👤 <span className="text-cyan-300">{user?.name || "Loading..."}</span> ▼
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#2F0A50] border border-cyan-300 shadow z-50">
              <button onClick={() => navigate("/profile")} className="w-full text-left px-4 py-2 hover:bg-cyan-800 text-white text-sm">Edit Profile</button>
              <button onClick={() => window.location.href = "http://localhost:5000/logout"} className="w-full text-left px-4 py-2 hover:bg-cyan-800 text-white text-sm">Sign out</button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 bg-[#16002A]/80 backdrop-blur-xl p-6 border border-[#2e114d]">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white text-black px-5 py-3 pl-12 text-base shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <FaSearch className="absolute top-4 left-4 text-gray-500 text-lg" />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <select className="bg-white/10 text-white px-4 py-2 border border-cyan-300 text-sm">
            <option className="bg-[#1A0033] text-white">Status</option>
            <option className="bg-[#1A0033] text-white">Live</option>
            <option className="bg-[#1A0033] text-white">Expired</option>
            <option className="bg-[#1A0033] text-white">Recent</option>
          </select>
          <select className="bg-white/10 text-white px-4 py-2 border border-cyan-300 text-sm">
            <option className="bg-[#1A0033] text-white">Sort By</option>
            <option className="bg-[#1A0033] text-white">Prize</option>
            <option className="bg-[#1A0033] text-white">Days Left</option>
          </select>
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase">
            Template
          </button>
          <button
            onClick={() => {
              navigate(activeTab === "competitions" ? "/create-competition" : "/create-event");
            }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
          >
            Create Events
          </button>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="bg-[#1A0033]/70 p-10 border border-[#2F0A50] text-center text-gray-400">
        {activeTab === "competitions" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.length === 0 ? (
              <p className="text-xl italic tracking-wide col-span-full">No competitions yet.</p>
            ) : (
              competitions.map((comp) => (
                <div key={comp._id} className="bg-[#260040] p-6 border border-cyan-400 text-left shadow text-sm">
                  <h3 className="text-lg font-semibold text-white mb-1">{comp.eventName}</h3>
                  <p className="text-sm text-gray-300">{comp.description}</p>
                  <p className="mt-2 text-cyan-200">Date: {comp.date}</p>
                  <p className="text-cyan-200">Venue: {comp.venue}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => deleteItem("competitions", comp._id)}
                      className="bg-cyan-600 hover:bg-cyan-400 px-3 py-1 text-white text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate("/create-competition", {
                          state: { data: comp, from: "competitions" }
                        })
                      }
                      className="bg-cyan-600 hover:bg-cyan-400 px-3 py-1 text-white text-xs"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length === 0 ? (
              <p className="text-xl italic tracking-wide col-span-full">No events yet.</p>
            ) : (
              events.map((event) => (
                <div key={event._id} className="bg-[#260040] p-6 border border-cyan-400 text-left shadow text-sm">
                  <h3 className="text-lg font-semibold text-white mb-1">{event.name}</h3>
                  <p className="text-sm text-gray-300">{event.description}</p>
                  <p className="mt-2 text-cyan-200">Date: {event.date}</p>
                  <p className="text-cyan-200">Venue: {event.venue}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => deleteItem("events", event._id)}
                      className="bg-cyan-600 hover:bg-cyan-400 px-3 py-1 text-white text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        navigate("/create-event", {
                          state: { data: event, from: "events" }
                        })
                      }
                      className="bg-cyan-600 hover:bg-cyan-400 px-3 py-1 text-white text-xs"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
