

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserTie, FaTrophy, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const _motion = motion;

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("competitions");
  const [competitions, setCompetitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [recommendedCompetitions, setRecommendedCompetitions] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [unconfirmedCompetitions, setUnconfirmedCompetitions] = useState([]);
  const [showUnconfirmedPopup, setShowUnconfirmedPopup] = useState(false);
  

  // Event registration states
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showEventConfirm, setShowEventConfirm] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Competition participation states
  const [showParticipationDialog, setShowParticipationDialog] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [participationType, setParticipationType] = useState('individual'); // 'individual' or 'team'
  const [teamDetails, setTeamDetails] = useState({
    name: '',
    members: [''],
  });

  const allCompetitions = useMemo(() => {
    return [...competitions, ...recommendedCompetitions];
  }, [competitions, recommendedCompetitions]);
  // Event registration handlers
  const handleRegisterEvent = (eventId) => {
    setSelectedEventId(eventId);
    setShowEventConfirm(true);
  };

  const confirmEventRegistration = async () => {
    setRegistering(true);
    try {
      const res = await fetch("/api/events/confirm-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId: selectedEventId })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Successfully registered for the event! 🎉");
        const eventsRes = await fetch("/api/events");
        if (eventsRes.ok) {
          const updatedEvents = await eventsRes.json();
          setEvents(updatedEvents);
        }
      } else {
        toast.error(`Error: ${data.error || "Failed to register"}`);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Something went wrong while registering.");
    } finally {
      setRegistering(false);
      setShowEventConfirm(false);
      setSelectedEventId(null);
    }
  };

  const cancelEventRegistration = () => {
    setShowEventConfirm(false); 
    setSelectedEventId(null);
  };

  // Competition participation handlers
  const handleConfirmClick = (competitionId) => {
    setSelectedCompetitionId(competitionId);
    setShowParticipationDialog(true);
    // Reset form when opening
    setParticipationType('individual');
    setTeamDetails({
      name: '',
      members: [''],
    });
  };

const handleParticipationSubmit = async () => {
  if (!selectedCompetitionId || !participationType) {
    toast.error("Please select a competition and participation type.");
    return;
  }

  if (
    participationType === "team" &&
    (!teamDetails.name ||
      teamDetails.members.length === 0 ||
      teamDetails.members.some((email) => !email.trim()))
  ) {
    toast.warn("Please enter team name and all member emails.");
    return;
  }

  const payload = {
    competitionId: selectedCompetitionId,
    type: participationType,
    ...(participationType === "team" && {
      teamName: teamDetails.name,
      teamMembers: teamDetails.members,
    }),
  };

  console.log("🚀 Sending payload:", payload);

  setRegistering(true);
  try {
    const res = await fetch("/api/competition/confirm-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("✅ Registration successful!");
      setShowParticipationDialog(false);
      setParticipationType("");
      setTeamDetails({ name: "", members: [""] });

      const competitionsRes = await fetch("/api/competitions");
      if (competitionsRes.ok) {
        setCompetitions(await competitionsRes.json());
      }

      if (user?._id) {
        await fetchRecommendedCompetitions(user._id);
      }
      setUnconfirmedCompetitions((prev) =>
        prev.filter((comp) => comp.competitionId !== selectedCompetitionId)
      );
    } else {
      toast.error(`❌ Error: ${data.error || "Failed to register"}`);
    }
  } catch (err) {
    console.error("Registration failed:", err);
    toast.error("Something went wrong while registering.");
  } finally {
    setRegistering(false);
  }
};

  const addTeamMember = () => {
    setTeamDetails(prev => ({
      ...prev,
      members: [...prev.members, '']
    }));
  };

  const removeTeamMember = (index) => {
    setTeamDetails(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const handleTeamMemberChange = (index, value) => {
    setTeamDetails(prev => ({
      ...prev,
      members: prev.members.map((member, i) => 
        i === index ? value : member
      )
    }));
  };
    const markAsViewed = async (email, competitionId) => {
      try {
        await fetch("/api/user/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, competitionId }),
        });
      } catch (err) {
        console.error("❌ Error marking as viewed:", err);
      }
    };

    const confirmViewedCompetition = async (email, competitionId) => {
      try {
        await fetch("/api/user/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, competitionId }),
        });
      } catch (err) {
        console.error("Error confirming viewed competition:", err);
      }
    };
  // Data fetching
  const fetchRecommendedCompetitions = async (userId) => {
    try {
      const res = await fetch(`/api/recommend/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      const data = await res.json();
      setRecommendedCompetitions(data.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
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
        if (userData?.email) {
  const res = await fetch(`/api/user/unconfirmed/${userData.email}`);
  if (res.ok) {
    const data = await res.json();
    if (data.length > 0) {
      setUnconfirmedCompetitions(data);
      setShowUnconfirmedPopup(true);
    }
  }
}

        
        if (userData?._id) {
          await fetchRecommendedCompetitions(userData._id);
        }

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

  useEffect(() => {
    if (!showParticipationDialog) {
      if (unconfirmedCompetitions.length > 0) {
        setShowUnconfirmedPopup(true);
      } else {
        setShowUnconfirmedPopup(false); 
      }
    }
  }, [showParticipationDialog, unconfirmedCompetitions.length]);

  const filteredItems = useMemo(() => {
    const items = activeTab === "competitions" ? competitions : events;
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.organiser && item.organiser.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [activeTab, competitions, events, searchTerm]);

  const CompetitionCard = ({ item, onConfirm, isRecommended }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -3, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

        <div className="flex justify-between items-start mb-3">
          <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
          {isRecommended ? (
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
            >
              Suggested
            </motion.span>
          ) : (
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
            >
              {item.mode || "Competition"}
            </motion.span>
          )}
        </div>

        <div className="space-y-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center">
            📍 <span className="ml-2">{item.location}</span>
          </div>
          <div className="flex items-center">
            🧑‍💼 <span className="ml-2">Organized by: {item.organiser}</span>
          </div>
          <div className="flex items-center">
            ⏳ <span className="ml-2">{item.daysLeft} days remaining</span>
          </div>
          {item.prize && (
            <div className="flex items-center">
              🏆 <span className="ml-2">Prize: {item.prize}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
          whileTap={{ scale: 0.98 }}
          onClick={async () => {
            if (user?.email) {
              await markAsViewed(user.email, item._id);
            }
            window.open(item.link, "_blank");
          }}
          className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
        >
          <FaExternalLinkAlt className="mr-1 text-sm" />
          View
        </motion.button>


          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f8e3a0" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConfirm(item._id)}
            className="flex items-center px-3 py-1.5 bg-[#FFF4E0] text-[#D4A017] rounded-md hover:bg-[#f8e3a0] text-sm"
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-[#4B3F72] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
      {/* Background elements */}
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

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#dcd8f1] shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center h-16">
            <div className="flex space-x-4 sm:space-x-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </motion.button>
              
<motion.button 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate("/confirmed-competitions")}
  className="text-gray-500 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
>
  My Competitions
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
            <div className="relative mt-2 sm:mt-0">
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
                  {user?.fullName?.charAt(0) || "U"}
                </motion.div>
                <span className="hidden md:inline-block">{user?.fullName || "User"}</span>
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
                      <svg className="w-4 h-4 mr-2 text-[#3e3e65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Edit Profile
                    </motion.button>
                    <motion.button 
                      whileHover={{ x: 5, backgroundColor: "#E3DFFF" }}
                      onClick={() => (window.location.href = "/auth/logout")}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 z-0">
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
                className="block w-full pl-10 pr-3 py-3 border border-[#E3DFFF] rounded-lg bg-[#F5F7FA] focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          {activeTab === "competitions" && recommendedCompetitions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
                    Recommended For You
                  </h1>
                  <p className="text-gray-500">
                    Based on your interest in {user?.domain || "your field"}
                  </p>
                </div>
                <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
                  {recommendedCompetitions.length} suggestions
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCompetitions.map((item) => (
                  <CompetitionCard 
                    key={item._id} 
                    item={item} 
                    onConfirm={handleConfirmClick}
                    isRecommended={true}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
                {activeTab === "competitions" ? "Available Competitions" : "Upcoming Events"}
              </h1>
              <p className="text-gray-500">
                {activeTab === "competitions" ? "Browse and participate in coding competitions" : "Discover and join upcoming events"}
              </p>
            </div>
            <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
              {filteredItems.length} {filteredItems.length === 1 ? activeTab.slice(0, -1) : activeTab}
            </div>
          </motion.div>

          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="bg-[#E3DFFF] bg-opacity-20 p-8 rounded-full mb-6">
                <svg className="text-[#4B3F72] text-4xl opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-lg font-light text-gray-500 mb-6">No {activeTab} found matching your search</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === "competitions" ? (
                filteredItems.map((item) => (
                  <CompetitionCard 
                    key={item._id} 
                    item={item} 
                    onConfirm={handleConfirmClick}
                    isRecommended={false}
                  />
                ))
              ) : (
                filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -3, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-base font-semibold text-[#4B3F72]">{item.title}</h2>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-0.5 text-xs font-medium bg-[#E3DFFF] text-[#4B3F72] rounded-full"
                      >
                        Event
                      </motion.span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600 mb-4">
                      <div className="flex items-center">
                        📍 <span className="ml-2">{item.venueDetails?.location || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        📅 <span className="ml-2">Date: {item.startTime ? new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🕒
                  </div>
                  <span>StartTime: {item.startTime ? new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                    🕒
                  </div>
                   <span>EndTime: {item.endTime ? new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span>

                </div>
                      <div className="flex items-center">
                        🏫 <span className="ml-2">College: {item.collegeName || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRegisterEvent(item._id)}
                        className="flex items-center px-3 py-1.5 bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] text-sm"
                      >
                        <FaExternalLinkAlt className="mr-1 text-sm" />
                        Register
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Event Registration Confirmation Dialog */}
      <AnimatePresence>
        {showEventConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-[#4B3F72] mb-4">
                Confirm Registration
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to register for this event?
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#E3DFFF" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelEventRegistration}
                  disabled={registering}
                  className={`px-4 py-2 bg-[#E3DFFF] text-[#4B3F72] rounded-lg hover:bg-[#d5d0f0] transition ${registering ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  No
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmEventRegistration}
                  disabled={registering}
                  className={`px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition flex items-center justify-center ${registering ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {registering ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : 'Yes'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Competition Participation Dialog */}
      <AnimatePresence>
        {showParticipationDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#4B3F72]">
                  How are you participating?
                </h3>
                <button 
                  onClick={() => setShowParticipationDialog(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setParticipationType('individual')}
                    className={`px-4 py-2 rounded-lg transition ${participationType === 'individual' ? 'bg-[#4B3F72] text-white' : 'bg-[#E3DFFF] text-[#4B3F72]'}`}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setParticipationType('team')}
                    className={`px-4 py-2 rounded-lg transition ${participationType === 'team' ? 'bg-[#4B3F72] text-white' : 'bg-[#E3DFFF] text-[#4B3F72]'}`}
                  >
                    Team
                  </button>
                </div>

                {participationType === 'team' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Team Name
                      </label>
                      <input
                        type="text"
                        value={teamDetails.name}
                        onChange={(e) => setTeamDetails(prev => ({...prev, name: e.target.value}))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter team name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Team Members
                      </label>
                      <div className="space-y-2">
                        {teamDetails.members.map((member, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={member}
                              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-md"
                              placeholder={index === 0 ? "Member 1 email" : `Member ${index + 1} email`}
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="p-2 text-red-500 hover:text-red-700"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="mt-2 text-sm text-[#4B3F72] hover:text-[#3A315A] flex items-center"
                      >
                        <span className="mr-1">+ Add team member</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#E3DFFF" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowParticipationDialog(false)}
                  disabled={registering}
                  className={`px-4 py-2 bg-[#E3DFFF] text-[#4B3F72] rounded-lg hover:bg-[#d5d0f0] transition ${registering ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleParticipationSubmit}
                  disabled={registering || (participationType === 'team' && (!teamDetails.name || teamDetails.members.some(m => !m)))}
                  className={`px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition flex items-center justify-center ${registering ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {registering ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : 'Confirm Participation'}
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
    <AnimatePresence>
      {showUnconfirmedPopup && !showParticipationDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999] px-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-5 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#4B3F72] mb-3 sm:mb-4 text-center">
              You've viewed competitions!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
              Please confirm the competitions you're interested in:
            </p>

            <ul className="space-y-3 max-h-[250px] overflow-y-auto mb-5">
              {unconfirmedCompetitions.map((item) => {
                const compTitle =
                  allCompetitions.find(c => c._id === item.competitionId)?.title ||
                  item.competitionId;
                return (
                  <li
                    key={item.competitionId}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                  >
                    <span className="text-sm text-[#3A315A] break-words max-w-[60%]">
                      {compTitle}
                    </span>
                    <button
                      className="text-xs px-3 py-1 bg-[#4B3F72] text-white rounded hover:bg-[#3A315A] transition"
                      onClick={async () => {
                        if (user?.email) {
                          await confirmViewedCompetition(user.email, item.competitionId);
                        }
                        setShowUnconfirmedPopup(false);
                        handleConfirmClick(item.competitionId);
                      }}
                    >
                      Confirm
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 w-full sm:w-auto bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                onClick={() => setShowUnconfirmedPopup(false)}
              >
                Skip All
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </div>
  );
}