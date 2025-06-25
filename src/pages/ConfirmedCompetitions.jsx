import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function ConfirmedCompetitions() {
  const navigate = useNavigate();
  const [confirmedCompetitions, setConfirmedCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userRes = await fetch("/api/profile/me", {
          credentials: "include"
        });
        
        if (!userRes.ok) throw new Error("Failed to fetch user profile");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch confirmed competitions for this user
        const competitionsRes = await fetch(`/api/competition-confirmations/user/${userData._id}`);
        
        if (!competitionsRes.ok) throw new Error("Failed to fetch confirmed competitions");
        const competitionsData = await competitionsRes.json();
        
        setConfirmedCompetitions(competitionsData);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to load confirmed competitions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        className="bg-[#dcd8f1] shadow-sm sticky top-0 z-10"
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
                onClick={() => navigate("/user")}  // Fixed dashboard navigation
                className="text-gray-500 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
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
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
                Your Confirmed Competitions
              </h1>
              <p className="text-gray-500">
                View all competitions you've registered for
              </p>
            </div>
            <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
              {confirmedCompetitions.length} competition{confirmedCompetitions.length !== 1 ? 's' : ''}
            </div>
          </div>

          {confirmedCompetitions.length === 0 ? (
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
              <p className="text-lg font-light text-gray-500 mb-6">You haven't registered for any competitions yet</p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#4B3F72" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/user")}  // Fixed navigation
                className="px-4 py-2 bg-[#4B3F72] text-white rounded-lg hover:bg-[#3A315A] transition"
              >
                Browse Competitions
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {confirmedCompetitions.map((competition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -3, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-lg shadow p-4 border border-[#E3DFFF] hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]" />

                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-base font-semibold text-[#4B3F72]">{competition.competitionTitle}</h2>
                    <div className="flex items-center">
                      {competition.professorUpdated ? (
                        <span className="flex items-center text-xs text-green-600">
                          <FaCheckCircle className="mr-1" /> Approved
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-yellow-600">
                          <FaTimesCircle className="mr-1" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      <span>Registered on: {new Date(competition.registeredOn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>Status: {competition.professorUpdated ? "Approved by professor" : "Pending approval"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
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