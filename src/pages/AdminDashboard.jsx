

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function HostDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("competitions");
//   const [competitions, setCompetitions] = useState([]);
//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     fetch("/api/profile", { credentials: "include" })
//       .then((res) => res.json())
//       .then(setUser)
//       .catch((err) => toast.error("Error fetching user data"));
//   }, []);

//   useEffect(() => {
//     fetch("/api/competitions")
//       .then((res) => res.json())
//       .then(setCompetitions)
//       .catch(() => toast.error("Failed to load competitions"));
//   }, []);

//   const handleDelete = async (id, source) => {
//     if (source !== "manual") {
//       toast.warn("Only manually created competitions can be deleted");
//       return;
//     }

//     try {
//       const res = await fetch(`/api/competitions/${id}`, { method: "DELETE" });
//       const data = await res.json();

//       if (res.ok) {
//         setCompetitions((prev) => prev.filter((item) => item._id !== id));
//         toast.success(data.msg);
//       } else {
//         toast.error(data.msg || "Delete failed");
//       }
//     } catch (err) {
//       toast.error("Server error during deletion");
//     }
//   };

//   const handleEdit = (item) => {
//     if (item.source !== "manual") {
//       toast.warn("Only manually created competitions can be edited");
//       return;
//     }
//     navigate("/create-competition", { state: { data: item, from: "competitions" } });
//   };

//   return (
//     <div className="min-h-screen font-['Inter'] bg-gradient-to-br from-[#0C001E] via-[#1A0033] to-[#0C001E] text-white px-8 py-6">
//       {/* Navbar */}
//       <div className="flex justify-between items-center mb-8 border-b border-cyan-400 pb-4">
//         <div className="flex space-x-10 text-lg font-medium uppercase tracking-wide">
//           <button onClick={() => navigate("/home")} className="hover:underline">Home</button>
//           <button onClick={() => setActiveTab("competitions")} className={`${activeTab === "competitions" ? "text-cyan-400 underline underline-offset-4" : ""} hover:underline`}>Competitions</button>
//           <button onClick={() => setActiveTab("events")} className="hover:underline opacity-50 cursor-not-allowed" >Events</button>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="bg-gradient-to-r from-[#2F0A50] to-[#1F002F] px-5 py-2 border border-cyan-300 font-medium shadow text-sm tracking-wide"
//           >
//             👤 <span className="text-cyan-300">{user?.name || "Loading..."}</span> ▼
//           </button>
//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-44 bg-[#2F0A50] border border-cyan-300 shadow z-50">
//               <button onClick={() => navigate("/profile")} className="w-full text-left px-4 py-2 hover:bg-cyan-800 text-white text-sm">Edit Profile</button>
//               <button onClick={() => window.location.href = "/auth/logout"} className="w-full text-left px-4 py-2 hover:bg-cyan-800 text-white text-sm">Sign out</button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Search and Create Section */}
//       <div className="flex flex-wrap gap-4 items-center justify-between mb-8 bg-[#16002A]/80 backdrop-blur-xl p-6 border border-[#2e114d]">
//         <div className="relative w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-white text-black px-5 py-3 pl-12 text-base shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           />
//           <FaSearch className="absolute top-4 left-4 text-gray-500 text-lg" />
//         </div>
//         <div className="flex gap-4">
//           <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase">
//             Template
//           </button>
//           <button
//             onClick={() => navigate("/create-competition")}
//             className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
//           >
//             Create Competition
//           </button>
//         </div>
//       </div>

//       {/* Competition Cards */}
//       <div className="space-y-6">
//         {competitions.length === 0 ? (
//           <p className="text-lg italic tracking-wide text-center">No competitions yet.</p>
//         ) : (
//           competitions.map((item) => (
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

//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => window.open(item.link, "_blank")}
//                   className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm border border-green-700"
//                 >
//                   View Competition
//                 </button>
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-sm border border-yellow-300"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item._id, item.source)}
//                   className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm border border-red-300"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        )
      );
    } else {
      setFilteredEvents(
        events.filter((event) =>
          [event.title, event.location, event.organiser, event.mode]
            .some((field) => field?.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, competitions, events, activeTab]);

  const handleDelete = async (id, source, type) => {
    if (source !== "manual") {
      toast.warn("Only manually created items can be deleted");
      return;
    }

    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        if (type === "competitions") {
          setCompetitions((prev) => prev.filter((item) => item._id !== id));
        } else {
          setEvents((prev) => prev.filter((item) => item._id !== id));
        }
        toast.success(data.msg);
      } else {
        toast.error(data.msg || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error during deletion");
    }
  };

  const handleEdit = (item, type) => {
  if (item.source !== "manual") {
    toast.warn("Only manually created items can be edited");
    return;
  }

  const route = type === "competitions" ? "competition" : "event";
  navigate(`/create-${route}`, { state: { data: item, from: type } });
};


  const renderCards = (data, type) => (
    data.length === 0 ? (
      <p className="text-lg italic tracking-wide text-center">No {type} found.</p>
    ) : (
      data.map((item) => (
        <div
          key={item._id}
          className="w-full bg-[#16002A] p-6 border border-cyan-400 shadow-sm text-left"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-cyan-200 mb-4">
            <p><span className="font-semibold text-white">Days Left:</span> {item.daysLeft}</p>
            <p><span className="font-semibold text-white">Mode:</span> {item.mode}</p>
            <p><span className="font-semibold text-white">Location:</span> {item.location}</p>
            <p><span className="font-semibold text-white">Prize:</span> {item.prize}</p>
            <p><span className="font-semibold text-white">Organiser:</span> {item.organiser}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open(item.link, "_blank")}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
            >
              View {type.slice(0, -1)}
            </button>
            <button
              onClick={() => handleEdit(item, type)}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id, item.source, type)}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )
  );

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
              <button onClick={() => window.location.href = "/auth/logout"} className="w-full text-left px-4 py-2 hover:bg-cyan-800 text-white text-sm">Sign out</button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Create Section */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8 bg-[#16002A]/80 backdrop-blur-xl p-6 border border-cyan-400">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder={`Search by title, location, organiser, mode...`}
            className="w-full bg-white text-black px-5 py-3 pl-12 text-base shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-4 left-4 text-gray-500 text-lg" />
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/template")}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase">
            Template
          </button>
          <button
            onClick={() =>
              activeTab === "competitions"
                ? navigate("/create-competition")
                : navigate("/create-event")
            }
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold uppercase"
          >
            Create {activeTab === "competitions" ? "Competition" : "Event"}
          </button>
        </div>
      </div>

      {/* Render Cards */}
      <div className="space-y-6">
        {activeTab === "competitions"
          ? renderCards(filteredCompetitions, "competitions")
          : renderCards(filteredEvents, "events")}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
