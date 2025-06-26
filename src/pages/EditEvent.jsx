
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatForInput } from "../components/dateUtils.jsx";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
const _mation = motion;
const BubbleBackground = () => {
  const bubbles = Array.from({ length: 15 });
  
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {bubbles.map((_, i) => {
        const size = Math.random() * 100 + 50;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.2 + 0.1;
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

export default function EditEvent() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collegeName: "",
    roomnumber: "",
    location: "",
    capacity: "",
    EventDate: "",
    startTime: "",
    endTime: "",
  });

  // Format date to YYYY-MM-DD
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 10);
  };

  // Format time to HH:mm
  const formatTime = (timeStr) => {
    const d = new Date(timeStr);
    return d.toISOString().slice(11, 16);
  };
  useEffect(() => {
    const event = state?.data;
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        collegeName: event.collegeName || "",
        roomnumber: event.venueDetails?.roomnumber || "",
        location: event.venueDetails?.location || "",
        capacity: event.venueDetails?.capacity || "",
        EventDate: formatDate(event.EventDate),
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime)
      });
      setLoading(false);
    } else {
      fetch(`/api/events/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            collegeName: data.collegeName || "",
            roomnumber: data.venueDetails?.roomnumber || "",
            location: data.venueDetails?.location || "",
            capacity: data.venueDetails?.capacity || "",
            EventDate: formatDate(data.EventDate),
            startTime: formatTime(data.startTime),
            endTime: formatTime(data.endTime)
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          toast.error("Failed to load event data");
          navigate("/host-dashboard");
        });
    }
  }, [state, id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert input strings back to proper Date objects
    const payload = {
          title: formData.title,
          description: formData.description,
          collegeName: formData.collegeName,
          EventDate: formData.EventDate, // "08-07-2025"
          startTime: formData.startTime, // "09:00"
          endTime: formData.endTime,     // "10:00"
          venueDetails: {
              roomnumber: formData.roomnumber,
              location: formData.location,
              capacity: parseInt(formData.capacity),
            },
      };

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("🎉 Event Updated successfully!");
        setTimeout(() => navigate("/host-dashboard"), 1500);
      } else {
        toast.error(result.msg || result.message || "Update failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("😟 Update failed: Server error");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#4B3F72] border-t-transparent rounded-full mx-auto"
        ></motion.div>
        <p className="mt-4 text-lg font-medium text-[#4B3F72]">Loading event details...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1E1E1E] font-sans relative overflow-hidden">
      <BubbleBackground />
      
      {/* Background Decorations */}
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
        className="bg-[#dcd8f1] shadow-sm relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/host-dashboard")}
              className="flex items-center text-[#4B3F72] hover:text-[#4B3F72] px-4 py-2 rounded-lg transition-all hover:bg-[#E3DFFF]"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-[#4B3F72] to-[#3A315A] bg-clip-text text-transparent"
            >
              Edit Event
            </motion.h1>
            <div className="w-24"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-[#E3DFFF]"
        >
          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-[#4B3F72] mb-2"
            >
              Update Event Details
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500"
            >
              Modify the information below to update your event
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "title", label: "Event Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                { name: "description", label: "Description", type: "text", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
                { name: "collegeName", label: "College Name", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "roomnumber", label: "Room Number", type: "text", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { name: "location", label: "Location", type: "text", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { name: "capacity", label: "Capacity", type: "number", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                { name: "EventDate", label: "EventDate", type: "date", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                { name: "startTime", label: "Start Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "endTime", label: "End Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="space-y-2"
                >
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                    </svg>
                    {field.label}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(75, 63, 114, 0.2)" }}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    min={field.name === "endTime" ? formData.startTime : undefined}
                    className="w-full px-4 py-3 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] transition-all hover:border-[#4B3F72] bg-[#F5F7FA]"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#E3DFFF]"
            >
              <motion.button
                type="button"
                onClick={() => navigate("/host-dashboard")}
                whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-6 py-3 bg-[#FFE5E6] text-[#EF767A] rounded-lg hover:bg-[#f8d5d6] transition-colors"
              >
                <FaTimes className="mr-2" />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                Update Event
              </motion.button>
            </motion.div>
          </form>
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