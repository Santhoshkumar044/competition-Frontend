import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie, FaTrophy, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
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
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  const confirmParticipation = async (competitionId) => {
    try {
      const res = await fetch("/api/competition/confirm-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ competitionId })
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
    setLoadingStats(true);
    setStatsError(null);
    try {
      const res = await fetch(`/api/stats/${competitionId}/participant-stats`);
      if (!res.ok) throw new Error(res.status === 404 ? "No stats available" : "Failed to fetch stats");
      const data = await res.json();
      
      // Check if stats are empty
      if (Object.keys(data.department).length === 0 && Object.keys(data.batch).length === 0) {
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
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/profile/me", {
          credentials: "include"
        });
        if (!userRes.ok) throw new Error("Failed to fetch user profile");
        const userData = await userRes.json();
        setUser(userData);

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

  const filteredItems = (activeTab === "competitions" ? competitions : events).filter((item) =>
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-16">
            <div className="flex space-x-4 sm:space-x-8">
              <button onClick={() => navigate("/")} className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </button>
              <button onClick={() => setActiveTab("competitions")} className={`${activeTab === "competitions" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors`}>
                Competitions
              </button>
              <button onClick={() => setActiveTab("events")} className={`${activeTab === "events" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"} px-3 py-2 text-sm font-medium transition-colors`}>
                Events
              </button>
            </div>
            <div className="relative mt-2 sm:mt-0">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {user?.fullName?.charAt(0) || "U"}
                </div>
                <span className="hidden md:inline-block">{user?.fullName || "User"}</span>
                <svg className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <button onClick={() => navigate("/profile")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    Edit Profile
                  </button>
                  <button onClick={() => (window.location.href = "/auth/logout")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
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

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {activeTab === "competitions" ? "Available Competitions" : "Upcoming Events"}
          </h1>
          <p className="text-gray-500 mb-6">
            {activeTab === "competitions" ? "Browse and participate in coding competitions" : "Discover and join upcoming events"}
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

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <button
                        onClick={() => window.open(item.link, "_blank")}
                        className="flex items-center w-full sm:w-auto justify-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
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
                            disabled={loadingStats}
                            className={`flex items-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors ${
                              loadingStats ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {loadingStats && visibleStatsId === item._id ? 'Loading...' : 'View Stats'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Stats Popup */}
 {visibleStatsId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-4 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">Participation Statistics</h3>
              <button 
                onClick={closeStats}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {loadingStats ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : statsError ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {statsError.includes("No data") ? "No participation data available" : "Failed to load statistics"}
                  </p>
                </div>
              ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">Department-wise Participation</h4>
                    {Object.keys(stats.department || {}).length > 0 ? (
                      <ul className="space-y-2">
                        {Object.entries(stats.department).map(([dept, count]) => (
                          <li key={dept} className="flex justify-between">
                            <span className="text-gray-600">{dept}</span>
                            <span className="font-medium text-indigo-600">{count}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No department data</p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">Batch-wise Participation</h4>
                    {Object.keys(stats.batch || {}).length > 0 ? (
                      <ul className="space-y-2">
                        {Object.entries(stats.batch).map(([batch, count]) => (
                          <li key={batch} className="flex justify-between">
                            <span className="text-gray-600">{batch}</span>
                            <span className="font-medium text-indigo-600">{count}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No batch data</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="border-t border-gray-200 p-4 flex justify-end sticky bottom-0 bg-white">
              <button
                onClick={closeStats}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
