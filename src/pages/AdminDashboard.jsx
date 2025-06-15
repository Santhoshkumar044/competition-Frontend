import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
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
          [event.title, event.venueDetails?.location, event.collegeName]
            .some((field) => field?.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, competitions, events, activeTab]);

  const handleDelete = async (id, type) => {
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
    const route = type === "competitions" ? "competition" : "event";
    navigate(`/edit-${route}/${item._id}`, {
      state: { data: item, from: type },
    });
  };

  const renderCards = (data, type) => (
    data.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg font-light text-gray-400 italic">No {type} found matching your search</p>
        <button
          onClick={() => activeTab === "competitions" ? navigate("/create-competition") : navigate("/create-event")}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Create New {type.slice(0, -1)}
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {item.mode || (type === "events" ? "Event" : "Competition")}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                {type === "events" ? (
  <>
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
      <span>{item.venueDetails?.location || "N/A"}</span>
    </div>
    
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <span>Date: {item.EventDate ? new Date(item.EventDate).toLocaleDateString() : "N/A"}</span>
    </div>
    
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Time: {item.StartTime || "N/A"}</span>
    </div>
    
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
      <span>College: {item.collegeName || "N/A"}</span>
    </div>
    
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Room: {item.venueDetails?.roomnumber || "N/A"}</span>
    </div>
  </>

                ) : (
                  <>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{item.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                      <span>Organized by: {item.organiser}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{item.daysLeft} days remaining</span>
                    </div>
                    
                    {item.prize && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
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
                <button
                  onClick={() => handleEdit(item, type)}
                  className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, type)}
                  className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-8">
              <button 
                onClick={() => navigate("/home")}
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
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="hidden md:inline-block">{user?.name || "User"}</span>
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
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => navigate("/template")}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium"
              >
                Template
              </button>
              <button
                onClick={() =>
                  activeTab === "competitions"
                    ? navigate("/create-competition")
                    : navigate("/create-event")
                }
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium"
              >
                Create {activeTab === "competitions" ? "Competition" : "Event"}
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {activeTab === "competitions" ? "Your Competitions" : "Your Events"}
          </h1>
          <p className="text-gray-500 mb-6">
            {activeTab === "competitions" 
              ? "Manage and track all your coding competitions" 
              : "Organize and monitor your scheduled events"}
          </p>
          
          {activeTab === "competitions"
            ? renderCards(filteredCompetitions, "competitions")
            : renderCards(filteredEvents, "events")}
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
