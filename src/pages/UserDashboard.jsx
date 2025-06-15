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
//   const [searchTerm, setSearchTerm] = useState("");

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

//   const filteredItems = (activeTab === "competitions" ? competitions : events).filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.organiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     String(item.prize).toLowerCase().includes(searchTerm.toLowerCase())
//   );

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
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
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
//         {filteredItems.length === 0 ? (
//           <p className="text-lg italic tracking-wide text-center">No {activeTab} yet.</p>
//         ) : (
//           filteredItems.map((item) => (
//             <div
//               key={item._id}
//               className="w-full bg-[#260040] p-6 border border-cyan-400 shadow-sm text-left"
//             >
//               <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-cyan-200 mb-4">
//                 <p><span className="font-semibold text-white">Days Left:</span> {item.daysLeft}</p>
//                 <p><span className="font-semibold text-white">Mode:</span> {item.mode}</p>
//                 <p><span className="font-semibold text-white">Location:</span> {item.location}</p>
//                 <p><span className="font-semibold text-white">Prize:</span> {item.prize}</p>
//                 <p><span className="font-semibold text-white">Organiser:</span> {item.organiser}</p>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 <button
//                   className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-700"
//                   onClick={() => window.open(item.link, "_blank")}
//                 >
//                   View Competition
//                 </button>

//                 <button
//                   className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-300"
//                   onClick={() => {
//                     fetch("/api/profile", { credentials: "include" })
//                       .then((res) => res.json())
//                       .then((data) => {
//                         alert(`Confirmed by ${data.name} for "${item.title}"`);
//                         console.log("User data:", data);
//                       })
//                       .catch((err) => console.error("Confirmation failed:", err));
//                   }}
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// 
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie, FaTrophy, FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("competitions");
  const [competitions, setCompetitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [visibleStatsId, setVisibleStatsId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const confirmParticipation = async (competitionId) => {
    try {
      const res = await fetch("/api/confirm-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ competitionId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Confirmation successful!");
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Confirmation failed:", err);
      toast.error("Something went wrong while confirming.");
    }
  };

  const fetchStats = async (competitionId) => {
    try {
      const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
      if (!res.ok) throw new Error("Stats not found");
      const data = await res.json();
      setStats(data);
      setVisibleStatsId(competitionId);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch stats.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userRes = await fetch("/api/profile/me", {
          credentials: "include",
        });
        if (!userRes.ok) throw new Error("Failed to fetch user profile");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch competitions or events based on activeTab
        const url = activeTab === "competitions" ? "/api/competitions" : "/api/events";
        const dataRes = await fetch(url);
        if (!dataRes.ok) throw new Error(`Failed to fetch ${activeTab}`);
        const itemsData = await dataRes.json();
        
        if (activeTab === "competitions") {
          setCompetitions(itemsData);
        } else {
          setEvents(itemsData);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(`Failed to load ${activeTab}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const filteredItems = (activeTab === "competitions" ? competitions : events).filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.organiser && item.organiser.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-indigo-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header - Matching Admin Dashboard */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-8">
              <button 
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab("competitions")}
                className={`${activeTab === "competitions" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Competitions
              </button>
              <button 
                onClick={() => setActiveTab("events")}
                className={`${activeTab === "events" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Events
              </button>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user?.fullName?.charAt(0) || "U"}
                </div>
                <span className="hidden md:inline-block">{user?.fullName || "User"}</span>
                <svg className={`w-4 h-4 transition-transform ${menuOpen ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <button 
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => window.location.href = "/auth/logout"}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Action Bar */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab} by title, location, organiser...`}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {activeTab === "competitions" ? "Available Competitions" : "Upcoming Events"}
          </h1>
          <p className="text-gray-500 mb-6">
            {activeTab === "competitions" 
              ? "Browse and participate in coding competitions" 
              : "Discover and join upcoming events"}
          </p>
          
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-light text-gray-400 italic">No {activeTab} found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                        {item.mode || (activeTab === "events" ? "Event" : "Competition")}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                      {activeTab === "events" ? (
                        <>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>{item.venueDetails?.location || "N/A"}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FaCalendarAlt className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>Date: {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : "N/A"}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FaClock className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>Time: {item.eventTime || "N/A"}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FaUserTie className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>College: {item.collegeName || "N/A"}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>{item.location}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FaUserTie className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>Organized by: {item.organiser}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <FaCalendarAlt className="w-4 h-4 mr-2 text-indigo-500" />
                            <span>{item.daysLeft} days remaining</span>
                          </div>
                          
                          {item.prize && (
                            <div className="flex items-center">
                              <FaTrophy className="w-4 h-4 mr-2 text-indigo-500" />
                              <span>Prize: {item.prize}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => window.open(item.link, "_blank")}
                        className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        View
                      </button>
                      {activeTab === "competitions" && (
                        <>
                          <button
                            onClick={() => confirmParticipation(item._id)}
                            className="flex items-center px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => fetchStats(item._id)}
                            className="flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                          >
                            View Stats
                          </button>
                        </>
                      )}
                    </div>

                    {visibleStatsId === item._id && stats && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-md font-bold text-indigo-600 mb-2">Participant Stats</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-1">Department</h5>
                            <ul className="space-y-1">
                              {Object.entries(stats.department).map(([dept, count]) => (
                                <li key={dept} className="flex justify-between">
                                  <span className="text-gray-600">{dept}</span>
                                  <span className="text-indigo-600">{count}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-1">Batch</h5>
                            <ul className="space-y-1">
                              {Object.entries(stats.batch).map(([batch, count]) => (
                                <li key={batch} className="flex justify-between">
                                  <span className="text-gray-600">{batch}</span>
                                  <span className="text-indigo-600">{count}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="rounded-lg shadow-lg"
        bodyClassName="font-sans p-4"
      />
    </div>
  );
}