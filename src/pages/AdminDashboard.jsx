

// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt, FaChartBar, FaTimes, FaPlus, FaUserCircle } from "react-icons/fa";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { motion, AnimatePresence } from "framer-motion";


// // const _maotion = motion;
// // // Add this new component at the top of your file
// // const BubbleBackground = () => {
// //   const bubbles = Array.from({ length: 15 }); // Number of bubbles
  
// //   return (
// //     <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
// //       {bubbles.map((_, i) => {
// //         const size = Math.random() * 100 + 50; // Random size between 50-150px
// //         const duration = Math.random() * 20 + 20; // Random duration between 20-40s
// //         const delay = Math.random() * 10; // Random delay up to 10s
// //         const left = Math.random() * 100; // Random horizontal position
// //         const opacity = Math.random() * 0.2 + 0.1; // Random opacity between 0.1-0.3
        
// //         // Random color selection
// //         const colors = ['#E3DFFF', '#F7C59F', '#A5B4FC', '#C6F6D5', '#FED7D7'];
// //         const color = colors[Math.floor(Math.random() * colors.length)];
        
// //         return (
// //           <motion.div
// //             key={i}
// //             initial={{ y: "100vh", opacity: 0 }}
// //             animate={{ 
// //               y: `-${size}px`,
// //               opacity: [0, opacity, opacity, 0],
// //               x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
// //             }}
// //             transition={{ 
// //               duration,
// //               delay,
// //               repeat: Infinity,
// //               repeatType: "loop",
// //               ease: "linear"
// //             }}
// //             style={{
// //               width: `${size}px`,
// //               height: `${size}px`,
// //               left: `${left}%`,
// //               backgroundColor: color,
// //               borderRadius: "50%",
// //               position: "absolute",
// //               filter: "blur(40px)"
// //             }}
// //           />
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default function HostDashboard() {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("competitions");
// //   const [competitions, setCompetitions] = useState([]);
// //   const [filteredCompetitions, setFilteredCompetitions] = useState([]);
// //   const [events, setEvents] = useState([]);
// //   const [filteredEvents, setFilteredEvents] = useState([]);
// //   const [user, setUser] = useState(null);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [stats, setStats] = useState(null);
// //   const [visibleStatsId, setVisibleStatsId] = useState(null);
// //   const [loadingStats, setLoadingStats] = useState(false);
// //   const [statsError, setStatsError] = useState(null);

// //   const fetchStats = async (competitionId) => {
// //     setLoadingStats(true);
// //     setStatsError(null);
// //     try {
// //       const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
// //       if (!res.ok) {
// //         throw new Error(res.status === 404 ? "No stats available" : "Failed to fetch stats");
// //       }
// //       const data = await res.json();
      
// //       if (Object.keys(data.department).length === 0 && Object.keys(data.batch).length === 0) {
// //         throw new Error("No participation data available");
// //       }
      
// //       setStats(data);
// //       setVisibleStatsId(competitionId);
// //     } catch (error) {
// //       console.error("Error fetching stats:", error);
// //       setStatsError(error.message);
// //       if (error.message === "No stats available" || error.message === "No participation data available") {
// //         toast.info("No participation data available for this competition");
// //       } else {
// //         toast.error("Failed to fetch stats");
// //       }
// //     } finally {
// //       setLoadingStats(false);
// //     }
// //   };

// //   const closeStats = () => {
// //     setVisibleStatsId(null);
// //     setStats(null);
// //     setStatsError(null);
// //   };

// //   useEffect(() => {
// //     fetch("/api/profile", { credentials: "include" })
// //       .then((res) => res.json())
// //       .then(setUser)
// //       .catch(() => toast.error("Error fetching user data"));
// //   }, []);

// //   useEffect(() => {
// //     fetch("/api/competitions")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setCompetitions(data);
// //         setFilteredCompetitions(data);
// //       })
// //       .catch(() => toast.error("Failed to load competitions"));

// //     fetch("/api/events")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setEvents(data);
// //         setFilteredEvents(data);
// //       })
// //       .catch(() => toast.error("Failed to load events"));
// //   }, []);

// //   useEffect(() => {
// //     const term = searchTerm.toLowerCase();
// //     if (activeTab === "competitions") {
// //       setFilteredCompetitions(
// //         competitions.filter((comp) =>
// //           [comp.title, comp.location, comp.organiser, comp.mode]
// //             .some((field) => field?.toLowerCase().includes(term))
// //       ));
// //     } else {
// //       setFilteredEvents(
// //         events.filter((event) =>
// //           [event.title, event.venueDetails?.location, event.collegeName]
// //             .some((field) => field?.toLowerCase().includes(term))
// //       ));
// //     }
// //   }, [searchTerm, competitions, events, activeTab]);

// //   const handleDelete = async (id, type) => {
// //     if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    
// //     try {
// //       const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
// //       const data = await res.json();

// //       if (res.ok) {
// //         if (type === "competitions") {
// //           setCompetitions((prev) => prev.filter((item) => item._id !== id));
// //         } else {
// //           setEvents((prev) => prev.filter((item) => item._id !== id));
// //         }
// //         toast.success(data.msg || "Deleted successfully");
// //       } else {
// //         toast.error(data.msg || "Delete failed");
// //       }
// //     } catch (err) {
// //       toast.error("Server error during deletion",err);
// //     }
// //   };

// //   const handleEdit = (item, type) => {
// //     const route = type === "competitions" ? "competition" : "event";
// //     navigate(`/edit-${route}/${item._id}`, {
// //       state: { data: item, from: type },
// //     });
// //   };

// //   const renderCards = (data, type) => (
// //   data.length === 0 ? (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4 }}
// //       className="flex flex-col items-center justify-center py-12"
// //     >
// //       <div className="bg-[#E3DFFF] bg-opacity-20 p-6 rounded-full mb-4">
// //         <FaPlus className="text-[#4B3F72] text-3xl opacity-60" />
// //       </div>
// //       <p className="text-sm font-light text-gray-500 mb-4">No {type} found matching your search</p>
// //       <motion.button
// //         whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
// //         whileTap={{ scale: 0.98 }}
// //         onClick={() => activeTab === "competitions" ? navigate("/create-competition") : navigate("/create-event")}
// //         className="px-4 py-2 bg-gradient-to-r from-[#4B3F72] to-[rgb(58,49,90)] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm"
// //       >
// //         <FaPlus className="mr-2 text-sm" />
// //         Create New {type.slice(0, -1)}
// //       </motion.button>
// //     </motion.div>
// //   ) : (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //       {data.map((item, index) => (
// //         <motion.div
// //           key={item._id}
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.3, delay: index * 0.05 }}
// //           whileHover={{ y: -3, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
// //           className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
// //         >
// //           {/* Accent */}
// //           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

// //           <div className="flex justify-between items-start mb-3">
// //             <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
// //             <motion.span 
// //               whileHover={{ scale: 1.1 }}
// //               className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
// //             >
// //               {item.mode || (type === "events" ? "Event" : "Competition")}
// //             </motion.span>
// //           </div>

// //           <div className="space-y-2 text-xs text-gray-600 mb-4">
// //             {type === "events" ? (
// //               <>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     📍
// //                   </div>
// //                   <span>{item.venueDetails?.location || "N/A"}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     📅
// //                   </div>
// //                   <span>Date: {item.EventDate ? new Date(item.EventDate).toLocaleDateString() : "N/A"}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     🕒
// //                   </div>
// //                   <span>Time: {item.StartTime || "N/A"}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     🎓
// //                   </div>
// //                   <span>College: {item.collegeName || "N/A"}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     🏫
// //                   </div>
// //                   <span>Room: {item.venueDetails?.roomnumber || "N/A"}</span>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     📍
// //                   </div>
// //                   <span>{item.location}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     🧑‍💼
// //                   </div>
// //                   <span>Organized by: {item.organiser}</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                     ⏳
// //                   </div>
// //                   <span>{item.daysLeft} days remaining</span>
// //                 </div>
// //                 {item.prize && (
// //                   <div className="flex items-center">
// //                     <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
// //                       🏆
// //                     </div>
// //                     <span>Prize: {item.prize}</span>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>

// //           <div className="flex flex-wrap gap-2">
// //             {type === "competitions" && (
// //               <motion.button
// //                 whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => window.open(item.link, "_blank")}
// //                 className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
// //               >
// //                 <FaExternalLinkAlt className="mr-1 text-sm" />
// //                 View
// //               </motion.button>
// //             )}
// //             <motion.button
// //               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
// //               whileTap={{ scale: 0.98 }}
// //               onClick={() => handleEdit(item, type)}
// //               className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
// //             >
// //               <FaEdit className="mr-1 text-sm" />
// //               Edit
// //             </motion.button>
// //             <motion.button
// //               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
// //               whileTap={{ scale: 0.98 }}
// //               onClick={() => handleDelete(item._id, type)}
// //               className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
// //             >
// //               <FaTrash className="mr-1 text-sm" />
// //               Delete
// //             </motion.button>
// //             {type === "competitions" && (
// //               <motion.button
// //                 whileHover={{ scale: 1.05, backgroundColor: "#f8d5d6" }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => fetchStats(item._id)}
// //                 disabled={loadingStats}
// //                 className={`flex items-center px-3 py-1.5 bg-[#FFE5E6] text-[#EF767A] rounded-md hover:bg-[#f8d5d6] text-sm ${
// //                   loadingStats && visibleStatsId === item._id ? 'opacity-50 cursor-not-allowed' : ''
// //                 }`}
// //               >
// //                 <FaChartBar className="mr-1 text-sm" />
// //                 {loadingStats && visibleStatsId === item._id ? (
// //                   <motion.span
// //                     animate={{ rotate: 360 }}
// //                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //                     className="inline-block"
// //                   >
// //                     ⏳
// //                   </motion.span>
// //                 ) : 'Stats'}
// //               </motion.button>
// //             )}
// //           </div>
// //         </motion.div>
// //       ))}
// //     </div>
// //   )
// // );


// //   return (
// //     <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
// //       <BubbleBackground />
// //       {/* 🌸 Subtle Background Decorations */}
// //       <motion.div 
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 0.4 }}
// //         transition={{ duration: 1 }}
// //         className="fixed w-[300px] h-[300px] bg-[#E3DFFF] rounded-full blur-[160px] top-[-50px] left-[-100px] z-0" 
// //       />
// //       <motion.div 
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 0.3 }}
// //         transition={{ duration: 1, delay: 0.3 }}
// //         className="fixed w-[200px] h-[200px] bg-[#F7C59F] rounded-full blur-[140px] bottom-[-50px] right-[-60px] z-0"
// //       />

// //       {/* 🚀 Navbar */}
// //       <motion.header 
// //         initial={{ y: -20, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.5 }}
// //         className="bg-[#dcd8f1] shadow-sm sticky top-0 z-10"
        
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between h-16 items-center">
// //             <div className="flex space-x-4 sm:space-x-8">
// //               <motion.button 
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => navigate("/home")}
// //                 className="text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
// //               >
// //                 Home
// //               </motion.button>
// //               <motion.button 
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => setActiveTab("competitions")}
// //                 className={`${activeTab === "competitions" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
// //               >
// //                 Competitions
// //                 {activeTab === "competitions" && (
// //                   <motion.span 
// //                     layoutId="tabIndicator"
// //                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
// //                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //                   />
// //                 )}
// //               </motion.button>
// //               <motion.button 
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => setActiveTab("events")}
// //                 className={`${activeTab === "events" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
// //               >
// //                 Events
// //                 {activeTab === "events" && (
// //                   <motion.span 
// //                     layoutId="tabIndicator"
// //                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
// //                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //                   />
// //                 )}
// //               </motion.button>
// //             </div>
            
// //             <div className="relative">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => setMenuOpen(!menuOpen)}
// //                 className="flex items-center space-x-2 text-gray-700 hover:text-[#4B3F72] transition-colors"
// //               >
// //                 <motion.div 
// //                   whileHover={{ rotate: 10 }}
// //                   className="w-8 h-8 rounded-full bg-[#E3DFFF] flex items-center justify-center text-[#4B3F72] font-medium shadow-sm"
// //                 >
// //                   {user?.name?.charAt(0) || "U"}
// //                 </motion.div>
// //                 <span className="hidden md:inline-block">{user?.name || "User"}</span>
// //                 <motion.svg 
// //                   animate={{ rotate: menuOpen ? 180 : 0 }}
// //                   className="w-4 h-4 transition-transform"
// //                   fill="none" 
// //                   stroke="currentColor" 
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
// //                 </motion.svg>
// //               </motion.button>
              
// //               <AnimatePresence>
// //                 {menuOpen && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -10 }}
// //                     transition={{ duration: 0.2 }}
// //                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden"
// //                   >
// //                     <motion.button 
// //                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
// //                       onClick={() => navigate("/profile")}
// //                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
// //                     >
// //                       <FaUserCircle className="mr-2 text-[#4B3F72]" />
// //                       Edit Profile
// //                     </motion.button>
// //                     <motion.button 
// //                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
// //                       onClick={() => window.location.href = "/auth/logout"}
// //                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
// //                     >
// //                       <svg className="w-4 h-4 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
// //                       </svg>
// //                       Sign out
// //                     </motion.button>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
// //         {/* Search and Action Bar */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.2 }}
// //           className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF] sticky top-16 z-40"
// //         >
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div className="relative flex-grow max-w-2xl">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <FaSearch className="text-[#4B3F72]" />
// //               </div>
// //               <motion.input
// //                 whileFocus={{ scale: 1.005, boxShadow: "0 0 0 2px rgba(75, 63, 114, 0.2)" }}
// //                 type="text"
// //                 placeholder={`Search ${activeTab} by title, location, organiser...`}
// //                 className="block w-full pl-10 pr-3 py-3 border border-[#0b153d] rounded-lg bg-[#F5F7FA] focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
            
// //             <div className="flex flex-wrap gap-3">
// //               <motion.button 
// //                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() => navigate("/template")}
// //                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
// //               >
// //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
// //                 </svg>
// //                 Template
// //               </motion.button>
// //               <motion.button
// //                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
// //                 whileTap={{ scale: 0.98 }}
// //                 onClick={() =>
// //                   activeTab === "competitions"
// //                     ? navigate("/create-competition")
// //                     : navigate("/create-event")
// //                 }
// //                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
// //               >
// //                 <FaPlus className="mr-2" />
// //                 Create {activeTab === "competitions" ? "Competition" : "Event"}
// //               </motion.button>
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Content Section */}
// //         <div className="mb-8">
// //           <motion.div 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.3 }}
// //             className="flex items-center justify-between mb-6"
// //           >
// //             <div>
// //               <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
// //                 {activeTab === "competitions" ? "Your Competitions" : "Your Events"}
// //               </h1>
// //               <p className="text-gray-500">
// //                 {activeTab === "competitions" 
// //                   ? "Manage and track all your coding competitions" 
// //                   : "Organize and monitor your scheduled events"}
// //               </p>
// //             </div>
// //             <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
// //               {activeTab === "competitions" 
// //                 ? `${filteredCompetitions.length} ${filteredCompetitions.length === 1 ? 'competition' : 'competitions'}` 
// //                 : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'}`}
// //             </div>
// //           </motion.div>
          
// //           {activeTab === "competitions"
// //             ? renderCards(filteredCompetitions, "competitions")
// //             : renderCards(filteredEvents, "events")}
// //         </div>
// //       </main>

// //       {/* Stats Popup */}
// //       <AnimatePresence>
// //         {visibleStatsId && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //           >
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
// //             >
// //               <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white">
// //                 <h3 className="text-lg font-semibold text-[#4B3F72]">Participation Statistics</h3>
// //                 <motion.button 
// //                   whileHover={{ rotate: 90, backgroundColor: "#E3DFFF" }}
// //                   onClick={closeStats}
// //                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
// //                 >
// //                   <FaTimes className="w-5 h-5" />
// //                 </motion.button>
// //               </div>
// //               <div className="p-6">
// //                 {loadingStats ? (
// //                   <motion.div 
// //                     animate={{ scale: [1, 1.05, 1] }}
// //                     transition={{ duration: 1.5, repeat: Infinity }}
// //                     className="flex justify-center items-center py-12"
// //                   >
// //                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B3F72]"></div>
// //                   </motion.div>
// //                 ) : statsError ? (
// //                   <div className="text-center py-8">
// //                     <div className="bg-[#FFE5E6] inline-flex p-4 rounded-full mb-4">
// //                       <FaChartBar className="text-[#EF767A] text-2xl" />
// //                     </div>
// //                     <p className="text-gray-500">
// //                       {statsError.includes("No data") ? "No participation data available" : "Failed to load statistics"}
// //                     </p>
// //                   </div>
// //                 ) : stats ? (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <motion.div
// //                       whileHover={{ y: -5 }}
// //                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
// //                     >
// //                       <div className="flex items-center mb-3">
// //                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
// //                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
// //                           </svg>
// //                         </div>
// //                         <h4 className="font-medium text-[#4B3F72]">Department-wise</h4>
// //                       </div>
// //                       {Object.keys(stats.department || {}).length > 0 ? (
// //                         <ul className="space-y-2">
// //                           {Object.entries(stats.department).map(([dept, count]) => (
// //                             <motion.li 
// //                               key={dept} 
// //                               initial={{ opacity: 0, x: -10 }}
// //                               animate={{ opacity: 1, x: 0 }}
// //                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
// //                             >
// //                               <span className="text-gray-600">{dept}</span>
// //                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
// //                             </motion.li>
// //                           ))}
// //                         </ul>
// //                       ) : (
// //                         <p className="text-gray-400 italic text-center py-4">No department data</p>
// //                       )}
// //                     </motion.div>
// //                     <motion.div
// //                       whileHover={{ y: -5 }}
// //                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
// //                     >
// //                       <div className="flex items-center mb-3">
// //                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
// //                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
// //                           </svg>
// //                         </div>
// //                         <h4 className="font-medium text-[#4B3F72]">Batch-wise</h4>
// //                       </div>
// //                       {Object.keys(stats.batch || {}).length > 0 ? (
// //                         <ul className="space-y-2">
// //                           {Object.entries(stats.batch).map(([batch, count]) => (
// //                             <motion.li 
// //                               key={batch} 
// //                               initial={{ opacity: 0, x: -10 }}
// //                               animate={{ opacity: 1, x: 0 }}
// //                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
// //                             >
// //                               <span className="text-gray-600">{batch}</span>
// //                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
// //                             </motion.li>
// //                           ))}
// //                         </ul>
// //                       ) : (
// //                         <p className="text-gray-400 italic text-center py-4">No batch data</p>
// //                       )}
// //                     </motion.div>
// //                   </div>
// //                 ) : null}
// //               </div>
// //               <div className="border-t border-gray-200 p-4 flex justify-end sticky bottom-0 bg-white">
// //                 <motion.button
// //                   whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onClick={closeStats}
// //                   className="px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition-colors"
// //                 >
// //                   Close
// //                 </motion.button>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <ToastContainer 
// //         position="top-center"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         toastClassName="rounded-lg shadow-lg"
// //         bodyClassName="font-sans p-4"
// //       />
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt, FaChartBar, FaTimes, FaPlus, FaUserCircle } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";


// const _maotion = motion;
// // Add this new component at the top of your file
// const BubbleBackground = () => {
//   const bubbles = Array.from({ length: 15 }); // Number of bubbles
  
//   return (
//     <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
//       {bubbles.map((_, i) => {
//         const size = Math.random() * 100 + 50; // Random size between 50-150px
//         const duration = Math.random() * 20 + 20; // Random duration between 20-40s
//         const delay = Math.random() * 10; // Random delay up to 10s
//         const left = Math.random() * 100; // Random horizontal position
//         const opacity = Math.random() * 0.2 + 0.1; // Random opacity between 0.1-0.3
        
//         // Random color selection
//         const colors = ['#E3DFFF', '#F7C59F', '#A5B4FC', '#C6F6D5', '#FED7D7'];
//         const color = colors[Math.floor(Math.random() * colors.length)];
        
//         return (
//           <motion.div
//             key={i}
//             initial={{ y: "100vh", opacity: 0 }}
//             animate={{ 
//               y: `-${size}px`,
//               opacity: [0, opacity, opacity, 0],
//               x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
//             }}
//             transition={{ 
//               duration,
//               delay,
//               repeat: Infinity,
//               repeatType: "loop",
//               ease: "linear"
//             }}
//             style={{
//               width: `${size}px`,
//               height: `${size}px`,
//               left: `${left}%`,
//               backgroundColor: color,
//               borderRadius: "50%",
//               position: "absolute",
//               filter: "blur(40px)"
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default function HostDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("competitions");
//   const [competitions, setCompetitions] = useState([]);
//   const [filteredCompetitions, setFilteredCompetitions] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState(null);
//   const [visibleStatsId, setVisibleStatsId] = useState(null);
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [statsError, setStatsError] = useState(null);

//   const fetchStats = async (competitionId) => {
//     setLoadingStats(true);
//     setStatsError(null);
//     try {
//       const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
//       if (!res.ok) {
//         throw new Error(res.status === 404 ? "No stats available" : "Failed to fetch stats");
//       }
//       const data = await res.json();
      
//       if (Object.keys(data.department).length === 0 && Object.keys(data.batch).length === 0 && Object.keys(data.coe).length === 0) {
//         throw new Error("No participation data available");
//       }
      
//       setStats(data);
//       setVisibleStatsId(competitionId);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//       setStatsError(error.message);
//       if (error.message === "No stats available" || error.message === "No participation data available") {
//         toast.info("No participation data available for this competition");
//       } else {
//         toast.error("Failed to fetch stats");
//       }
//     } finally {
//       setLoadingStats(false);
//     }
//   };

//   const closeStats = () => {
//     setVisibleStatsId(null);
//     setStats(null);
//     setStatsError(null);
//   };

//   useEffect(() => {
//     fetch("/api/profile", { credentials: "include" })
//       .then((res) => res.json())
//       .then(setUser)
//       .catch(() => toast.error("Error fetching user data"));
//   }, []);

//   useEffect(() => {
//     fetch("/api/competitions")
//       .then((res) => res.json())
//       .then((data) => {
//         setCompetitions(data);
//         setFilteredCompetitions(data);
//       })
//       .catch(() => toast.error("Failed to load competitions"));

//     fetch("/api/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//       })
//       .catch(() => toast.error("Failed to load events"));
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();
//     if (activeTab === "competitions") {
//       setFilteredCompetitions(
//         competitions.filter((comp) =>
//           [comp.title, comp.location, comp.organiser, comp.mode]
//             .some((field) => field?.toLowerCase().includes(term))
//       ));
//     } else {
//       setFilteredEvents(
//         events.filter((event) =>
//           [event.title, event.venueDetails?.location, event.collegeName]
//             .some((field) => field?.toLowerCase().includes(term))
//       ));
//     }
//   }, [searchTerm, competitions, events, activeTab]);

// const handleReject = async (competitionId) => {
//   try {
//     const res = await fetch(`/api/host/competitions/${competitionId}/reject`, {
//       method: "PATCH",
//       credentials: "include"
//     });

//     if (res.ok) {
//       setCompetitions(prev => prev.filter(comp => comp._id !== competitionId));
//       toast.success("Competition rejected and removed!");
//     } else {
//       const data = await res.json();
//       toast.error(data.msg || "Rejection failed");
//     }
//   } catch (err) {
//     console.error("Error rejecting competition:", err);
//     toast.error("Error rejecting competition");
//   }
// };

//   const handleEdit = (item, type) => {
//     const route = type === "competitions" ? "competition" : "event";
//     navigate(`/edit-${route}/${item._id}`, {
//       state: { data: item, from: type },
//     });
//   };
// const handleApprove = async (competitionId) => {
//   try {
//     const res = await fetch(`/api/host/competitions/${competitionId}/approve`, {
//       method: "PATCH",
//       credentials: "include"
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setCompetitions(prev =>
//         prev.map(comp =>
//           comp._id === competitionId ? { ...comp, status: "approved" } : comp
//         )
//       );
//       toast.success("Competition approved successfully!");
//     } else {
//       toast.error(data.msg || "Approval failed");
//     }
//   } catch (err) {
//     console.error("Error approving competition:", err);
//     toast.error("Error approving competition");
//   }
// };

//   const renderCards = (data, type) => (
//   data.length === 0 ? (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="flex flex-col items-center justify-center py-12"
//     >
//       <div className="bg-[#E3DFFF] bg-opacity-20 p-6 rounded-full mb-4">
//         <FaPlus className="text-[#4B3F72] text-3xl opacity-60" />
//       </div>
//       <p className="text-sm font-light text-gray-500 mb-4">No {type} found matching your search</p>
//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//         whileTap={{ scale: 0.98 }}
//         onClick={() => activeTab === "competitions" ? navigate("/create-competition") : navigate("/create-event")}
//         className="px-4 py-2 bg-gradient-to-r from-[#4B3F72] to-[rgb(58,49,90)] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm"
//       >
//         <FaPlus className="mr-2 text-sm" />
//         Create New {type.slice(0, -1)}
//       </motion.button>
//     </motion.div>
//   ) : (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {data.map((item, index) => (
//         <motion.div
//           key={item._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.05 }}
//           whileHover={{ y: -3, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
//           className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
//         >
//           {/* Accent */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

//           <div className="flex justify-between items-start mb-3">
//             <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
//             <motion.span 
//               whileHover={{ scale: 1.1 }}
//               className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
//             >
//               {item.mode || (type === "events" ? "Event" : "Competition")}
//             </motion.span>
//           </div>

//           <div className="space-y-2 text-xs text-gray-600 mb-4">
//             {type === "events" ? (
//               <>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📍
//                   </div>
//                   <span>{item.venueDetails?.location || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📅
//                   </div>
//                   <span>Date: {item.EventDate ? new Date(item.EventDate).toLocaleDateString() : "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🕒
//                   </div>
//                   <span>Time: {item.StartTime || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🎓
//                   </div>
//                   <span>College: {item.collegeName || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🏫
//                   </div>
//                   <span>Room: {item.venueDetails?.roomnumber || "N/A"}</span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📍
//                   </div>
//                   <span>{item.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🧑‍💼
//                   </div>
//                   <span>Organized by: {item.organiser}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     ⏳
//                   </div>
//                   <span>{item.daysLeft} days remaining</span>
//                 </div>
//                 {item.prize && (
//                   <div className="flex items-center">
//                     <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                       🏆
//                     </div>
//                     <span>Prize: {item.prize}</span>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {type === "competitions" && (
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => window.open(item.link, "_blank")}
//                 className="flex items-center px-7 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//               >
//                 <FaExternalLinkAlt className="mr-1 text-sm" />
//                 View
//               </motion.button>
//             )}
//             <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleEdit(item, type)}
//               className="flex items-center px-7 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//             >
//               <FaEdit className="mr-1 text-sm" />
//               Edit
//             </motion.button>
           
//             {type === "competitions" && (
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#f8d5d6" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => fetchStats(item._id)}
//                 disabled={loadingStats}
//                 className={`flex items-center px-8 py-1.5 bg-[#FFE5E6] text-[#EF767A] rounded-md hover:bg-[#f8d5d6] text-sm ${
//                   loadingStats && visibleStatsId === item._id ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <FaChartBar className="mr-1 text-sm" />
//                 {loadingStats && visibleStatsId === item._id ? (
//                   <motion.span
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="inline-block"
//                   >
//                     ⏳
//                   </motion.span>
            
//                 ) : 'Stats'}
//               </motion.button>
          
//             )}
//              {type === "competitions" && !item.isApproved && (
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#d0f0d5" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleApprove(item._id)}
//                 className="flex items-center px-13 py-1.5 bg-[#E0FFE5] text-[#2E7D32] rounded-md hover:bg-[#d0f0d5] text-sm"
//               >
//                 Approve
//               </motion.button>
//             )}
//              <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleReject(item._id, type)}
//               className="flex items-center px-14 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//             >
//               <FaTrash className="mr-1 text-sm" />
//               Reject
//             </motion.button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   )
// );


//   return (
//     <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
//       <BubbleBackground />
//       {/* 🌸 Subtle Background Decorations */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.4 }}
//         transition={{ duration: 1 }}
//         className="fixed w-[300px] h-[300px] bg-[#E3DFFF] rounded-full blur-[160px] top-[-50px] left-[-100px] z-0" 
//       />
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         className="fixed w-[200px] h-[200px] bg-[#F7C59F] rounded-full blur-[140px] bottom-[-50px] right-[-60px] z-0"
//       />

//       {/* 🚀 Navbar */}
//       <motion.header 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#dcd8f1] shadow-sm sticky top-0 z-10"
        
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex space-x-4 sm:space-x-8">
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/home")}
//                 className="text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Home
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setActiveTab("competitions")}
//                 className={`${activeTab === "competitions" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
//               >
//                 Competitions
//                 {activeTab === "competitions" && (
//                   <motion.span 
//                     layoutId="tabIndicator"
//                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setActiveTab("events")}
//                 className={`${activeTab === "events" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
//               >
//                 Events
//                 {activeTab === "events" && (
//                   <motion.span 
//                     layoutId="tabIndicator"
//                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}
//               </motion.button>
//             </div>
            
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="flex items-center space-x-2 text-gray-700 hover:text-[#4B3F72] transition-colors"
//               >
//                 <motion.div 
//                   whileHover={{ rotate: 10 }}
//                   className="w-8 h-8 rounded-full bg-[#E3DFFF] flex items-center justify-center text-[#4B3F72] font-medium shadow-sm"
//                 >
//                   {user?.name?.charAt(0) || "U"}
//                 </motion.div>
//                 <span className="hidden md:inline-block">{user?.name || "User"}</span>
//                 <motion.svg 
//                   animate={{ rotate: menuOpen ? 180 : 0 }}
//                   className="w-4 h-4 transition-transform"
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </motion.svg>
//               </motion.button>
              
//               <AnimatePresence>
//                 {menuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden"
//                   >
//                     <motion.button 
//                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
//                       onClick={() => navigate("/profile")}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
//                     >
//                       <FaUserCircle className="mr-2 text-[#4B3F72]" />
//                       Edit Profile
//                     </motion.button>
//                     <motion.button 
//                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
//                       onClick={() => window.location.href = "/auth/logout"}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
//                     >
//                       <svg className="w-4 h-4 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//                       </svg>
//                       Sign out
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
//         {/* Search and Action Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF] sticky top-16 z-40"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="relative flex-grow max-w-2xl">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="text-[#4B3F72]" />
//               </div>
//               <motion.input
//                 whileFocus={{ scale: 1.005, boxShadow: "0 0 0 2px rgba(75, 63, 114, 0.2)" }}
//                 type="text"
//                 placeholder={`Search ${activeTab} by title, location, organiser...`}
//                 className="block w-full pl-10 pr-3 py-3 border border-[#0b153d] rounded-lg bg-[#F5F7FA] focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <motion.button 
//                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/template")}
//                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                 </svg>
//                 Template
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() =>
//                   activeTab === "competitions"
//                     ? navigate("/create-competition")
//                     : navigate("/create-event")
//                 }
//                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
//               >
//                 <FaPlus className="mr-2" />
//                 Create {activeTab === "competitions" ? "Competition" : "Event"}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Content Section */}
//         <div className="mb-8">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="flex items-center justify-between mb-6"
//           >
//             <div>
//               <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
//                 {activeTab === "competitions" ? "Your Competitions" : "Your Events"}
//               </h1>
//               <p className="text-gray-500">
//                 {activeTab === "competitions" 
//                   ? "Manage and track all your coding competitions" 
//                   : "Organize and monitor your scheduled events"}
//               </p>
//             </div>
//             <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
//               {activeTab === "competitions" 
//                 ? `${filteredCompetitions.length} ${filteredCompetitions.length === 1 ? 'competition' : 'competitions'}` 
//                 : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'}`}
//             </div>
//           </motion.div>
          
//           {activeTab === "competitions"
//             ? renderCards(filteredCompetitions, "competitions")
//             : renderCards(filteredEvents, "events")}
//         </div>
//       </main>

//       {/* Stats Popup */}
//       <AnimatePresence>
//         {visibleStatsId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//             >
//               <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white">
//                 <h3 className="text-lg font-semibold text-[#4B3F72]">Participation Statistics</h3>
//                 <motion.button 
//                   whileHover={{ rotate: 90, backgroundColor: "#E3DFFF" }}
//                   onClick={closeStats}
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </motion.button>
//               </div>
//               <div className="p-6">
//                 {loadingStats ? (
//                   <motion.div 
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                     className="flex justify-center items-center py-12"
//                   >
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B3F72]"></div>
//                   </motion.div>
//                 ) : statsError ? (
//                   <div className="text-center py-8">
//                     <div className="bg-[#FFE5E6] inline-flex p-4 rounded-full mb-4">
//                       <FaChartBar className="text-[#EF767A] text-2xl" />
//                     </div>
//                     <p className="text-gray-500">
//                       {statsError.includes("No data") ? "No participation data available" : "Failed to load statistics"}
//                     </p>
//                   </div>
//                 ) : stats ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
//                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
//                           </svg>
//                         </div>
//                         <h4 className="font-medium text-[#4B3F72]">Department-wise</h4>
//                       </div>
//                       {Object.keys(stats.department || {}).length > 0 ? (
//                         <ul className="space-y-2">
//                           {Object.entries(stats.department).map(([dept, count]) => (
//                             <motion.li 
//                               key={dept} 
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
//                             >
//                               <span className="text-gray-600">{dept}</span>
//                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
//                             </motion.li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-400 italic text-center py-4">No department data</p>
//                       )}
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
//                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
//                           </svg>
//                         </div>
//                         <h4 className="font-medium text-[#4B3F72]">Batch-wise</h4>
//                       </div>
//                       {Object.keys(stats.batch || {}).length > 0 ? (
//                         <ul className="space-y-2">
//                           {Object.entries(stats.batch).map(([batch, count]) => (
//                             <motion.li 
//                               key={batch} 
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
//                             >
//                               <span className="text-gray-600">{batch}</span>
//                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
//                             </motion.li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-400 italic text-center py-4">No batch data</p>
//                       )}
//                     </motion.div>
//                     <motion.div
//   whileHover={{ y: -5 }}
//   className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
// >
//   <div className="flex items-center mb-3">
//     <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
//       <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     </div>
//     <h4 className="font-medium text-[#4B3F72]">COE-wise</h4>
//   </div>
//   {Object.keys(stats.coe || {}).length > 0 ? (
//     <ul className="space-y-2">
//       {Object.entries(stats.coe).map(([coe, count]) => (
//         <motion.li 
//           key={coe} 
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
//         >
//           <span className="text-gray-600">{coe}</span>
//           <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
//         </motion.li>
//       ))}
//     </ul>
//   ) : (
//     <p className="text-gray-400 italic text-center py-4">No COE data</p>
//   )}
// </motion.div>
//                   </div>
//                 ) : null}
//               </div>
//               <div className="border-t border-gray-200 p-4 flex justify-end sticky bottom-0 bg-white">
//                 <motion.button
//                   whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={closeStats}
//                   className="px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition-colors"
//                 >
//                   Close
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <ToastContainer 
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="rounded-lg shadow-lg"
//         bodyClassName="font-sans p-4"
//       />
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt, FaChartBar, FaTimes, FaPlus, FaUserCircle } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";


// const _maotion = motion;
// // Add this new component at the top of your file
// const BubbleBackground = () => {
//   const bubbles = Array.from({ length: 15 }); // Number of bubbles
  
//   return (
//     <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
//       {bubbles.map((_, i) => {
//         const size = Math.random() * 100 + 50; // Random size between 50-150px
//         const duration = Math.random() * 20 + 20; // Random duration between 20-40s
//         const delay = Math.random() * 10; // Random delay up to 10s
//         const left = Math.random() * 100; // Random horizontal position
//         const opacity = Math.random() * 0.2 + 0.1; // Random opacity between 0.1-0.3
        
//         // Random color selection
//         const colors = ['#E3DFFF', '#F7C59F', '#A5B4FC', '#C6F6D5', '#FED7D7'];
//         const color = colors[Math.floor(Math.random() * colors.length)];
        
//         return (
//           <motion.div
//             key={i}
//             initial={{ y: "100vh", opacity: 0 }}
//             animate={{ 
//               y: `-${size}px`,
//               opacity: [0, opacity, opacity, 0],
//               x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
//             }}
//             transition={{ 
//               duration,
//               delay,
//               repeat: Infinity,
//               repeatType: "loop",
//               ease: "linear"
//             }}
//             style={{
//               width: `${size}px`,
//               height: `${size}px`,
//               left: `${left}%`,
//               backgroundColor: color,
//               borderRadius: "50%",
//               position: "absolute",
//               filter: "blur(40px)"
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default function HostDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("competitions");
//   const [competitions, setCompetitions] = useState([]);
//   const [filteredCompetitions, setFilteredCompetitions] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [stats, setStats] = useState(null);
//   const [visibleStatsId, setVisibleStatsId] = useState(null);
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [statsError, setStatsError] = useState(null);

//   const fetchStats = async (competitionId) => {
//     setLoadingStats(true);
//     setStatsError(null);
//     try {
//       const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
//       if (!res.ok) {
//         throw new Error(res.status === 404 ? "No stats available" : "Failed to fetch stats");
//       }
//       const data = await res.json();
      
//       if (Object.keys(data.department).length === 0 && Object.keys(data.batch).length === 0) {
//         throw new Error("No participation data available");
//       }
      
//       setStats(data);
//       setVisibleStatsId(competitionId);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//       setStatsError(error.message);
//       if (error.message === "No stats available" || error.message === "No participation data available") {
//         toast.info("No participation data available for this competition");
//       } else {
//         toast.error("Failed to fetch stats");
//       }
//     } finally {
//       setLoadingStats(false);
//     }
//   };

//   const closeStats = () => {
//     setVisibleStatsId(null);
//     setStats(null);
//     setStatsError(null);
//   };

//   useEffect(() => {
//     fetch("/api/profile", { credentials: "include" })
//       .then((res) => res.json())
//       .then(setUser)
//       .catch(() => toast.error("Error fetching user data"));
//   }, []);

//   useEffect(() => {
//     fetch("/api/competitions")
//       .then((res) => res.json())
//       .then((data) => {
//         setCompetitions(data);
//         setFilteredCompetitions(data);
//       })
//       .catch(() => toast.error("Failed to load competitions"));

//     fetch("/api/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//       })
//       .catch(() => toast.error("Failed to load events"));
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();
//     if (activeTab === "competitions") {
//       setFilteredCompetitions(
//         competitions.filter((comp) =>
//           [comp.title, comp.location, comp.organiser, comp.mode]
//             .some((field) => field?.toLowerCase().includes(term))
//       ));
//     } else {
//       setFilteredEvents(
//         events.filter((event) =>
//           [event.title, event.venueDetails?.location, event.collegeName]
//             .some((field) => field?.toLowerCase().includes(term))
//       ));
//     }
//   }, [searchTerm, competitions, events, activeTab]);

//   const handleDelete = async (id, type) => {
//     if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    
//     try {
//       const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
//       const data = await res.json();

//       if (res.ok) {
//         if (type === "competitions") {
//           setCompetitions((prev) => prev.filter((item) => item._id !== id));
//         } else {
//           setEvents((prev) => prev.filter((item) => item._id !== id));
//         }
//         toast.success(data.msg || "Deleted successfully");
//       } else {
//         toast.error(data.msg || "Delete failed");
//       }
//     } catch (err) {
//       toast.error("Server error during deletion",err);
//     }
//   };

//   const handleEdit = (item, type) => {
//     const route = type === "competitions" ? "competition" : "event";
//     navigate(`/edit-${route}/${item._id}`, {
//       state: { data: item, from: type },
//     });
//   };

//   const renderCards = (data, type) => (
//   data.length === 0 ? (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="flex flex-col items-center justify-center py-12"
//     >
//       <div className="bg-[#E3DFFF] bg-opacity-20 p-6 rounded-full mb-4">
//         <FaPlus className="text-[#4B3F72] text-3xl opacity-60" />
//       </div>
//       <p className="text-sm font-light text-gray-500 mb-4">No {type} found matching your search</p>
//       <motion.button
//         whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//         whileTap={{ scale: 0.98 }}
//         onClick={() => activeTab === "competitions" ? navigate("/create-competition") : navigate("/create-event")}
//         className="px-4 py-2 bg-gradient-to-r from-[#4B3F72] to-[rgb(58,49,90)] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm"
//       >
//         <FaPlus className="mr-2 text-sm" />
//         Create New {type.slice(0, -1)}
//       </motion.button>
//     </motion.div>
//   ) : (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {data.map((item, index) => (
//         <motion.div
//           key={item._id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, delay: index * 0.05 }}
//           whileHover={{ y: -3, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
//           className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
//         >
//           {/* Accent */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

//           <div className="flex justify-between items-start mb-3">
//             <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
//             <motion.span 
//               whileHover={{ scale: 1.1 }}
//               className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
//             >
//               {item.mode || (type === "events" ? "Event" : "Competition")}
//             </motion.span>
//           </div>

//           <div className="space-y-2 text-xs text-gray-600 mb-4">
//             {type === "events" ? (
//               <>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📍
//                   </div>
//                   <span>{item.venueDetails?.location || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📅
//                   </div>
//                   <span>Date: {item.EventDate ? new Date(item.EventDate).toLocaleDateString() : "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🕒
//                   </div>
//                   <span>Time: {item.StartTime || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🎓
//                   </div>
//                   <span>College: {item.collegeName || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🏫
//                   </div>
//                   <span>Room: {item.venueDetails?.roomnumber || "N/A"}</span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     📍
//                   </div>
//                   <span>{item.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     🧑‍💼
//                   </div>
//                   <span>Organized by: {item.organiser}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                     ⏳
//                   </div>
//                   <span>{item.daysLeft} days remaining</span>
//                 </div>
//                 {item.prize && (
//                   <div className="flex items-center">
//                     <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
//                       🏆
//                     </div>
//                     <span>Prize: {item.prize}</span>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {type === "competitions" && (
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => window.open(item.link, "_blank")}
//                 className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//               >
//                 <FaExternalLinkAlt className="mr-1 text-sm" />
//                 View
//               </motion.button>
//             )}
//             <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleEdit(item, type)}
//               className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//             >
//               <FaEdit className="mr-1 text-sm" />
//               Edit
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleDelete(item._id, type)}
//               className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
//             >
//               <FaTrash className="mr-1 text-sm" />
//               Delete
//             </motion.button>
//             {type === "competitions" && (
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#f8d5d6" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => fetchStats(item._id)}
//                 disabled={loadingStats}
//                 className={`flex items-center px-3 py-1.5 bg-[#FFE5E6] text-[#EF767A] rounded-md hover:bg-[#f8d5d6] text-sm ${
//                   loadingStats && visibleStatsId === item._id ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <FaChartBar className="mr-1 text-sm" />
//                 {loadingStats && visibleStatsId === item._id ? (
//                   <motion.span
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     className="inline-block"
//                   >
//                     ⏳
//                   </motion.span>
//                 ) : 'Stats'}
//               </motion.button>
//             )}
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   )
// );


//   return (
//     <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
//       <BubbleBackground />
//       {/* 🌸 Subtle Background Decorations */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.4 }}
//         transition={{ duration: 1 }}
//         className="fixed w-[300px] h-[300px] bg-[#E3DFFF] rounded-full blur-[160px] top-[-50px] left-[-100px] z-0" 
//       />
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         className="fixed w-[200px] h-[200px] bg-[#F7C59F] rounded-full blur-[140px] bottom-[-50px] right-[-60px] z-0"
//       />

//       {/* 🚀 Navbar */}
//       <motion.header 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-[#dcd8f1] shadow-sm sticky top-0 z-10"
        
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex space-x-4 sm:space-x-8">
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/home")}
//                 className="text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Home
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setActiveTab("competitions")}
//                 className={`${activeTab === "competitions" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
//               >
//                 Competitions
//                 {activeTab === "competitions" && (
//                   <motion.span 
//                     layoutId="tabIndicator"
//                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setActiveTab("events")}
//                 className={`${activeTab === "events" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
//               >
//                 Events
//                 {activeTab === "events" && (
//                   <motion.span 
//                     layoutId="tabIndicator"
//                     className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}
//               </motion.button>
//             </div>
            
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="flex items-center space-x-2 text-gray-700 hover:text-[#4B3F72] transition-colors"
//               >
//                 <motion.div 
//                   whileHover={{ rotate: 10 }}
//                   className="w-8 h-8 rounded-full bg-[#E3DFFF] flex items-center justify-center text-[#4B3F72] font-medium shadow-sm"
//                 >
//                   {user?.name?.charAt(0) || "U"}
//                 </motion.div>
//                 <span className="hidden md:inline-block">{user?.name || "User"}</span>
//                 <motion.svg 
//                   animate={{ rotate: menuOpen ? 180 : 0 }}
//                   className="w-4 h-4 transition-transform"
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </motion.svg>
//               </motion.button>
              
//               <AnimatePresence>
//                 {menuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden"
//                   >
//                     <motion.button 
//                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
//                       onClick={() => navigate("/profile")}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
//                     >
//                       <FaUserCircle className="mr-2 text-[#4B3F72]" />
//                       Edit Profile
//                     </motion.button>
//                     <motion.button 
//                       whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
//                       onClick={() => window.location.href = "/auth/logout"}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
//                     >
//                       <svg className="w-4 h-4 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//                       </svg>
//                       Sign out
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
//         {/* Search and Action Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF] sticky top-16 z-40"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="relative flex-grow max-w-2xl">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="text-[#4B3F72]" />
//               </div>
//               <motion.input
//                 whileFocus={{ scale: 1.005, boxShadow: "0 0 0 2px rgba(75, 63, 114, 0.2)" }}
//                 type="text"
//                 placeholder={`Search ${activeTab} by title, location, organiser...`}
//                 className="block w-full pl-10 pr-3 py-3 border border-[#0b153d] rounded-lg bg-[#F5F7FA] focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex flex-wrap gap-3">
//               <motion.button 
//                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate("/template")}
//                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//                 </svg>
//                 Template
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() =>
//                   activeTab === "competitions"
//                     ? navigate("/create-competition")
//                     : navigate("/create-event")
//                 }
//                 className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
//               >
//                 <FaPlus className="mr-2" />
//                 Create {activeTab === "competitions" ? "Competition" : "Event"}
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Content Section */}
//         <div className="mb-8">
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="flex items-center justify-between mb-6"
//           >
//             <div>
//               <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
//                 {activeTab === "competitions" ? "Your Competitions" : "Your Events"}
//               </h1>
//               <p className="text-gray-500">
//                 {activeTab === "competitions" 
//                   ? "Manage and track all your coding competitions" 
//                   : "Organize and monitor your scheduled events"}
//               </p>
//             </div>
//             <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
//               {activeTab === "competitions" 
//                 ? `${filteredCompetitions.length} ${filteredCompetitions.length === 1 ? 'competition' : 'competitions'}` 
//                 : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'}`}
//             </div>
//           </motion.div>
          
//           {activeTab === "competitions"
//             ? renderCards(filteredCompetitions, "competitions")
//             : renderCards(filteredEvents, "events")}
//         </div>
//       </main>

//       {/* Stats Popup */}
//       <AnimatePresence>
//         {visibleStatsId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//             >
//               <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white">
//                 <h3 className="text-lg font-semibold text-[#4B3F72]">Participation Statistics</h3>
//                 <motion.button 
//                   whileHover={{ rotate: 90, backgroundColor: "#E3DFFF" }}
//                   onClick={closeStats}
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </motion.button>
//               </div>
//               <div className="p-6">
//                 {loadingStats ? (
//                   <motion.div 
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                     className="flex justify-center items-center py-12"
//                   >
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B3F72]"></div>
//                   </motion.div>
//                 ) : statsError ? (
//                   <div className="text-center py-8">
//                     <div className="bg-[#FFE5E6] inline-flex p-4 rounded-full mb-4">
//                       <FaChartBar className="text-[#EF767A] text-2xl" />
//                     </div>
//                     <p className="text-gray-500">
//                       {statsError.includes("No data") ? "No participation data available" : "Failed to load statistics"}
//                     </p>
//                   </div>
//                 ) : stats ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
//                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
//                           </svg>
//                         </div>
//                         <h4 className="font-medium text-[#4B3F72]">Department-wise</h4>
//                       </div>
//                       {Object.keys(stats.department || {}).length > 0 ? (
//                         <ul className="space-y-2">
//                           {Object.entries(stats.department).map(([dept, count]) => (
//                             <motion.li 
//                               key={dept} 
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
//                             >
//                               <span className="text-gray-600">{dept}</span>
//                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
//                             </motion.li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-400 italic text-center py-4">No department data</p>
//                       )}
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ y: -5 }}
//                       className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
//                     >
//                       <div className="flex items-center mb-3">
//                         <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
//                           <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
//                           </svg>
//                         </div>
//                         <h4 className="font-medium text-[#4B3F72]">Batch-wise</h4>
//                       </div>
//                       {Object.keys(stats.batch || {}).length > 0 ? (
//                         <ul className="space-y-2">
//                           {Object.entries(stats.batch).map(([batch, count]) => (
//                             <motion.li 
//                               key={batch} 
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
//                             >
//                               <span className="text-gray-600">{batch}</span>
//                               <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
//                             </motion.li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="text-gray-400 italic text-center py-4">No batch data</p>
//                       )}
//                     </motion.div>
//                   </div>
//                 ) : null}
//               </div>
//               <div className="border-t border-gray-200 p-4 flex justify-end sticky bottom-0 bg-white">
//                 <motion.button
//                   whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={closeStats}
//                   className="px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition-colors"
//                 >
//                   Close
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <ToastContainer 
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="rounded-lg shadow-lg"
//         bodyClassName="font-sans p-4"
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt, FaChartBar, FaTimes, FaPlus, FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";


const _maotion = motion;
// Add this new component at the top of your file
const BubbleBackground = () => {
  const bubbles = Array.from({ length: 15 }); // Number of bubbles
  
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {bubbles.map((_, i) => {
        const size = Math.random() * 100 + 50; // Random size between 50-150px
        const duration = Math.random() * 20 + 20; // Random duration between 20-40s
        const delay = Math.random() * 10; // Random delay up to 10s
        const left = Math.random() * 100; // Random horizontal position
        const opacity = Math.random() * 0.2 + 0.1; // Random opacity between 0.1-0.3
        
        // Random color selection
        const colors = ['#E3DFFF', '#F7C59F', '#A5B4FC', '#C6F6D5', '#FED7D7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ 
              y: `-${size}px`,
              opacity: [0, opacity, opacity, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50]
            }}
            transition={{ 
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              backgroundColor: color,
              borderRadius: "50%",
              position: "absolute",
              filter: "blur(40px)"
            }}
          />
        );
      })}
    </div>
  );
};

export default function HostDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("competitions");
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState(null);
  const [visibleStatsId, setVisibleStatsId] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const fetchStats = async (competitionId) => {
    setLoadingStats(true);
    setStatsError(null);
    try {
      const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
      if (!res.ok) {
        throw new Error(res.status === 404 ? "No stats available" : "Failed to fetch stats");
      }
      const data = await res.json();
      
      if (Object.keys(data.department).length === 0 && Object.keys(data.batch).length === 0 && Object.keys(data.coe).length === 0) {
        throw new Error("No participation data available");
      }
      
      setStats(data);
      setVisibleStatsId(competitionId);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStatsError(error.message);
      if (error.message === "No stats available" || error.message === "No participation data available") {
        toast.info("No participation data available for this competition");
      } else {
        toast.error("Failed to fetch stats");
      }
    } finally {
      setLoadingStats(false);
    }
  };

  const closeStats = () => {
    setVisibleStatsId(null);
    setStats(null);
    setStatsError(null);
  };

  useEffect(() => {
    fetch("/api/profile", { credentials: "include" })
      .then((res) => res.json())
      .then(setUser)
      .catch(() => toast.error("Error fetching user data"));
  }, []);

  useEffect(() => {
    fetch("/api/competitions")
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data);
        setFilteredCompetitions(data);
      })
      .catch(() => toast.error("Failed to load competitions"));

    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch(() => toast.error("Failed to load events"));
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    if (activeTab === "competitions") {
      setFilteredCompetitions(
        competitions.filter((comp) =>
          [comp.title, comp.location, comp.organiser, comp.mode]
            .some((field) => field?.toLowerCase().includes(term))
      ));
    } else {
      setFilteredEvents(
        events.filter((event) =>
          [event.title, event.venueDetails?.location, event.collegeName]
            .some((field) => field?.toLowerCase().includes(term))
      ));
    }
  }, [searchTerm, competitions, events, activeTab]);

 const handleReject = async (id, type) => {

  try {
    if (type === "competitions") {
      const res = await fetch(`/api/host/competitions/${id}/reject`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.ok) {
        setCompetitions((prev) => prev.filter((item) => item._id !== id));
        toast.success("Competition rejected and removed!");
      } else {
        const data = await res.json();
        toast.error(data.msg || "Rejection failed");
      }
    } else if (type === "events") {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((item) => item._id !== id));
        toast.success("Event deleted successfully!");
      } else {
        const data = await res.json();
        toast.error(data.msg || "Failed to delete event");
      }
    }
  } catch (err) {
    console.error(`Error rejecting ${type}:`, err);
    toast.error(`Error rejecting ${type}`);
  }
};

  const handleEdit = (item, type) => {
    const route = type === "competitions" ? "competition" : "event";
    navigate(`/edit-${route}/${item._id}`, {
      state: { data: item, from: type },
    });
  };
const handleApprove = async (competitionId) => {
  try {
    const res = await fetch(`/api/host/competitions/${competitionId}/approve`, {
      method: "PATCH",
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      setCompetitions(prev =>
  prev.map(comp =>
    comp._id === competitionId ? { ...comp, isApproved: true } : comp
  )
);

      toast.success("Competition approved successfully!");
    } else {
      toast.error(data.msg || "Approval failed");
    }
  } catch (err) {
    console.error("Error approving competition:", err);
    toast.error("Error approving competition");
  }
};

  const renderCards = (data, type) => (
  data.length === 0 ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="bg-[#E3DFFF] bg-opacity-20 p-6 rounded-full mb-4">
        <FaPlus className="text-[#4B3F72] text-3xl opacity-60" />
      </div>
      <p className="text-sm font-light text-gray-500 mb-4">No {type} found matching your search</p>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => activeTab === "competitions" ? navigate("/create-competition") : navigate("/create-event")}
        className="px-4 py-2 bg-gradient-to-r from-[#4B3F72] to-[rgb(58,49,90)] text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center text-sm"
      >
        <FaPlus className="mr-2 text-sm" />
        Create New {type.slice(0, -1)}
      </motion.button>
    </motion.div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -3, boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1)" }}
          className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
        >
          {/* Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

          <div className="flex justify-between items-start mb-3">
            <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
            >
              {item.mode || (type === "events" ? "Event" : "Competition")}
            </motion.span>
          </div>

          <div className="space-y-2 text-xs text-gray-600 mb-4">
            {type === "events" ? (
              <>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    📍
                  </div>
                  <span>{item.venueDetails?.location || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    📅
                  </div>
                  <span>Date: {item.EventDate ? new Date(item.EventDate).toLocaleDateString() : "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🕒
                  </div>
                  <span>Time: {item.StartTime || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🎓
                  </div>
                  <span>College: {item.collegeName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🏫
                  </div>
                  <span>Room: {item.venueDetails?.roomnumber || "N/A"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    📍
                  </div>
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🧑‍💼
                  </div>
                  <span>Organized by: {item.organiser}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    ⏳
                  </div>
                  <span>{item.daysLeft} days remaining</span>
                </div>
                {item.prize && (
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                      🏆
                    </div>
                    <span>Prize: {item.prize}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {type === "competitions" && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(item.link, "_blank")}
                className="flex items-center px-7 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
              >
                <FaExternalLinkAlt className="mr-1 text-sm" />
                View
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleEdit(item, type)}
              className="flex items-center px-7 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
            >
              <FaEdit className="mr-1 text-sm" />
              Edit
            </motion.button>
           
            {type === "competitions" && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f8d5d6" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fetchStats(item._id)}
                disabled={loadingStats}
                className={`flex items-center px-8 py-1.5 bg-[#FFE5E6] text-[#EF767A] rounded-md hover:bg-[#f8d5d6] text-sm ${
                  loadingStats && visibleStatsId === item._id ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FaChartBar className="mr-1 text-sm" />
                {loadingStats && visibleStatsId === item._id ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
            
                ) : 'Stats'}
              </motion.button>
          
            )}
             {type === "competitions" && !item.isApproved && (
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#d0f0d5" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApprove(item._id)}
                className="flex items-center px-13 py-1.5 bg-[#E0FFE5] text-[#2E7D32] rounded-md hover:bg-[#d0f0d5] text-sm"
              >
                Approve
              </motion.button>
            )}
             <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReject(item._id, type)}
              className="flex items-center px-14 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
            >
              <FaTrash className="mr-1 text-sm" />
              Reject
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
);


  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
      <BubbleBackground />
      {/* 🌸 Subtle Background Decorations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="fixed w-[300px] h-[300px] bg-[#E3DFFF] rounded-full blur-[160px] top-[-50px] left-[-100px] z-0" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="fixed w-[200px] h-[200px] bg-[#F7C59F] rounded-full blur-[140px] bottom-[-50px] right-[-60px] z-0"
      />

      {/* 🚀 Navbar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#dcd8f1] shadow-sm sticky top-0 z-10"
        
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4 sm:space-x-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/home")}
                className="text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("competitions")}
                className={`${activeTab === "competitions" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
              >
                Competitions
                {activeTab === "competitions" && (
                  <motion.span 
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("events")}
                className={`${activeTab === "events" ? "text-[#4B3F72] border-b-2 border-[#4B3F72]" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors relative group`}
              >
                Events
                {activeTab === "events" && (
                  <motion.span 
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4B3F72]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#4B3F72] transition-colors"
              >
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="w-8 h-8 rounded-full bg-[#E3DFFF] flex items-center justify-center text-[#4B3F72] font-medium shadow-sm"
                >
                  {user?.name?.charAt(0) || "U"}
                </motion.div>
                <span className="hidden md:inline-block">{user?.name || "User"}</span>
                <motion.svg 
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  className="w-4 h-4 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </motion.svg>
              </motion.button>
              
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden"
                  >
                    <motion.button 
                      whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
                      onClick={() => navigate("/profile")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
                    >
                      <FaUserCircle className="mr-2 text-[#4B3F72]" />
                      Edit Profile
                    </motion.button>
                    <motion.button 
                      whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
                      onClick={() => window.location.href = "/auth/logout"}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#4B3F72] transition-colors items-center"
                    >
                      <svg className="w-4 h-4 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                      </svg>
                      Sign out
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        {/* Search and Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF] sticky top-16 z-40"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[#4B3F72]" />
              </div>
              <motion.input
                whileFocus={{ scale: 1.005, boxShadow: "0 0 0 2px rgba(75, 63, 114, 0.2)" }}
                type="text"
                placeholder={`Search ${activeTab} by title, location, organiser...`}
                className="block w-full pl-10 pr-3 py-3 border border-[#0b153d] rounded-lg bg-[#F5F7FA] focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/template")}
                className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Template
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  activeTab === "competitions"
                    ? navigate("/create-competition")
                    : navigate("/create-event")
                }
                className="px-5 py-2.5 bg-gradient-to-r bg-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
              >
                <FaPlus className="mr-2" />
                Create {activeTab === "competitions" ? "Competition" : "Event"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
                {activeTab === "competitions" ? "Your Competitions" : "Your Events"}
              </h1>
              <p className="text-gray-500">
                {activeTab === "competitions" 
                  ? "Manage and track all your coding competitions" 
                  : "Organize and monitor your scheduled events"}
              </p>
            </div>
            <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
              {activeTab === "competitions" 
                ? `${filteredCompetitions.length} ${filteredCompetitions.length === 1 ? 'competition' : 'competitions'}` 
                : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'}`}
            </div>
          </motion.div>
          
          {activeTab === "competitions"
            ? renderCards(filteredCompetitions, "competitions")
            : renderCards(filteredEvents, "events")}
        </div>
      </main>

      {/* Stats Popup */}
      <AnimatePresence>
        {visibleStatsId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-[#4B3F72]">Participation Statistics</h3>
                <motion.button 
                  whileHover={{ rotate: 90, backgroundColor: "#E3DFFF" }}
                  onClick={closeStats}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6">
                {loadingStats ? (
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex justify-center items-center py-12"
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B3F72]"></div>
                  </motion.div>
                ) : statsError ? (
                  <div className="text-center py-8">
                    <div className="bg-[#FFE5E6] inline-flex p-4 rounded-full mb-4">
                      <FaChartBar className="text-[#EF767A] text-2xl" />
                    </div>
                    <p className="text-gray-500">
                      {statsError.includes("No data") ? "No participation data available" : "Failed to load statistics"}
                    </p>
                  </div>
                ) : stats ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                        </div>
                        <h4 className="font-medium text-[#4B3F72]">Department-wise</h4>
                      </div>
                      {Object.keys(stats.department || {}).length > 0 ? (
                        <ul className="space-y-2">
                          {Object.entries(stats.department).map(([dept, count]) => (
                            <motion.li 
                              key={dept} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
                            >
                              <span className="text-gray-600">{dept}</span>
                              <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic text-center py-4">No department data</p>
                      )}
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                          </svg>
                        </div>
                        <h4 className="font-medium text-[#4B3F72]">Batch-wise</h4>
                      </div>
                      {Object.keys(stats.batch || {}).length > 0 ? (
                        <ul className="space-y-2">
                          {Object.entries(stats.batch).map(([batch, count]) => (
                            <motion.li 
                              key={batch} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
                            >
                              <span className="text-gray-600">{batch}</span>
                              <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic text-center py-4">No batch data</p>
                      )}
                    </motion.div>
                    <motion.div
  whileHover={{ y: -5 }}
  className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E3DFFF]"
>
  <div className="flex items-center mb-3">
    <div className="w-10 h-10 rounded-full bg-[#E3DFFF] flex items-center justify-center mr-3">
      <svg className="w-5 h-5 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h4 className="font-medium text-[#4B3F72]">COE-wise</h4>
  </div>
  {Object.keys(stats.coe || {}).length > 0 ? (
    <ul className="space-y-2">
      {Object.entries(stats.coe).map(([coe, count]) => (
        <motion.li 
          key={coe} 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm"
        >
          <span className="text-gray-600">{coe}</span>
          <span className="font-medium text-[#4B3F72] bg-[#E3DFFF] px-2 py-1 rounded-full text-xs">{count}</span>
        </motion.li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400 italic text-center py-4">No COE data</p>
  )}
</motion.div>
                  </div>
                ) : null}
              </div>
              <div className="border-t border-gray-200 p-4 flex justify-end sticky bottom-0 bg-white">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeStats}
                  className="px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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