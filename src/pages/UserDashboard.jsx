// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("competitions");
//   const [competitions, setCompetitions] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     fetch("/api/profile", { credentials: "include" })
//       .then(res => res.json())
//       .then(data => setUser(data))
//       .catch(err => console.error("Error fetching profile:", err));
//   }, []);

//   useEffect(() => {
//     const url = activeTab === "competitions" ? "/api/competitions" : "/api/events";
//     fetch(url)
//       .then(res => res.json())
//       .then(data => (activeTab === "competitions" ? setCompetitions(data) : setEvents(data)))
//       .catch(err => console.error(`Error fetching ${activeTab}:`, err));
//   }, [activeTab]);

//   return (
//     <div className="min-h-screen font-['Inter'] bg-gradient-to-br from-[#0C001E] via-[#1A0033] to-[#0C001E] text-white px-8 py-6">
//       {/* Navbar */}
//       <div className="flex justify-between items-center mb-8 border-b border-cyan-400 pb-4">
//         <div className="flex space-x-10 text-lg font-semibold">
//           <button onClick={() => navigate("/")} className="hover:underline">Home</button>
//           <button
//             onClick={() => setActiveTab("competitions")}
//             className={`transition duration-300 ${activeTab === "competitions" ? "text-cyan-400 underline underline-offset-4" : "hover:underline"}`}
//           >
//             Competitions
//           </button>
//           <button
//             onClick={() => setActiveTab("events")}
//             className={`transition duration-300 ${activeTab === "events" ? "text-cyan-400 underline underline-offset-4" : "hover:underline"}`}
//           >
//             Events
//           </button>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="bg-gradient-to-r from-[#2F0A50] to-[#1F002F] px-4 py-2 text-sm font-medium border border-cyan-300"
//           >
//             👤 <span className="text-cyan-300">{user?.name || "Loading..."}</span> ▼
//           </button>
//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-44 bg-[#2F0A50] border border-cyan-300 shadow-lg z-50 text-sm">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="w-full text-left px-4 py-2 hover:bg-cyan-800"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={() => (window.location.href = "/auth/logout")}
//                 className="w-full text-left px-4 py-2 hover:bg-cyan-800"
//               >
//                 Sign out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 items-center justify-between mb-8 bg-[#16002A]/80 p-6 border border-[#2e114d]">
//         <div className="relative w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-white text-black px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-gray-300"
//           />
//           <FaSearch className="absolute top-3.5 left-4 text-gray-500 text-sm" /> 
//         </div>

//         <div className="flex flex-wrap gap-4 items-center text-sm">
//           <select className="bg-transparent border border-cyan-300 px-4 py-2 text-white">
//             <option className="bg-[#1A0033] text-white">Status</option>
//             <option className="bg-[#1A0033] text-white">Live</option>
//             <option className="bg-[#1A0033] text-white">Expired</option>
//             <option className="bg-[#1A0033] text-white">Recent</option>
//           </select>

//           <select className="bg-transparent border border-cyan-300 px-4 py-2 text-white">
//             <option className="bg-[#1A0033] text-white">Sort By</option>
//             <option className="bg-[#1A0033] text-white">Prize</option>
//             <option className="bg-[#1A0033] text-white">Days Left</option>
//           </select>
//         </div>
//       </div>
//       {/* Content */}
//       <div className="space-y-6">
//         {(activeTab === "competitions" ? competitions : events).length === 0 ? (
//           <p className="text-lg italic tracking-wide text-center">No {activeTab} yet.</p>
//         ) : (
//           (activeTab === "competitions" ? competitions : events).map((item) => (
//             <div
//               key={item._id}
//               className="w-full bg-[#260040] p-6 border border-cyan-400 shadow-sm text-left"
//             >
//           <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-cyan-200 mb-4">
//             <p><span className="font-semibold text-white">Days Left:</span> {item.daysLeft}</p>
//             <p><span className="font-semibold text-white">Mode:</span> {item.mode}</p>
//             <p><span className="font-semibold text-white">Location:</span> {item.location}</p>
//             <p><span className="font-semibold text-white">Prize:</span> {item.prize}</p>
//             <p><span className="font-semibold text-white">Organiser:</span> {item.organiser}</p>
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <button
//               className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-700"
//               onClick={() => window.open(item.link, "_blank")}
//             >
//               View Competition
//             </button>

//             <button
//               className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-sm border border-yellow-300"
//               onClick={() => {
//                 fetch("/api/profile", { credentials: "include" })
//                   .then((res) => res.json())
//                   .then((data) => {
//                     alert(`Confirmed by ${data.name} for "${item.title}"`);
//                     console.log("User data:", data);
//                   })
//                   .catch((err) => console.error("Confirmation failed:", err));
//               }}
//             >
//               Confirm
//             </button>
//               </div>
//             </div>
//           ))
//           )}
//         </div>
//     </div>
//   );
// }
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredItems = (activeTab === "competitions" ? competitions : events).filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.organiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.prize).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="space-y-6">
        {filteredItems.length === 0 ? (
          <p className="text-lg italic tracking-wide text-center">No {activeTab} yet.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="w-full bg-[#260040] p-6 border border-cyan-400 shadow-sm text-left"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-cyan-200 mb-4">
                <p><span className="font-semibold text-white">Days Left:</span> {item.daysLeft}</p>
                <p><span className="font-semibold text-white">Mode:</span> {item.mode}</p>
                <p><span className="font-semibold text-white">Location:</span> {item.location}</p>
                <p><span className="font-semibold text-white">Prize:</span> {item.prize}</p>
                <p><span className="font-semibold text-white">Organiser:</span> {item.organiser}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-700"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  View Competition
                </button>

                <button
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-300"
                  onClick={() => {
                    fetch("/api/profile", { credentials: "include" })
                      .then((res) => res.json())
                      .then((data) => {
                        alert(`Confirmed by ${data.name} for "${item.title}"`);
                        console.log("User data:", data);
                      })
                      .catch((err) => console.error("Confirmation failed:", err));
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
