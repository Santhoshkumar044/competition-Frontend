
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPlus, FaCalendarAlt, FaClock, FaUniversity, FaDoorOpen, FaHeading, FaAlignLeft } from "react-icons/fa";
import { BASEURL } from "../config.js";
const _motion = motion;
export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collegeName: "",
    name: "",
    EventDate: "",
    startTime: "",
    endTime: "",
  });
  
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, collegeName, name, EventDate, startTime, endTime } = formData;

      // // Combine date + time into full Date objects
      // const formattedStartTime = new Date(`${eventDate}T${startTime}`);
      // const formattedEndTime = new Date(`${eventDate}T${endTime}`);

    const fullStartTime = new Date(`${EventDate}T${startTime}`);
    const fullEndTime = new Date(`${EventDate}T${endTime}`);

    // ✅ Time validation
    if (fullStartTime >= fullEndTime) {
      toast.error("Start time must be earlier than end time.");
      return;
    }

      const payload = {
        title,
        description,
        collegeName,
        name,
        EventDate,
        // startTime: formattedStartTime.toISOString(),
        // endTime: formattedEndTime.toISOString(),
        startTime,
        endTime
      };


      const response = await fetch(`${BASEURL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("🎉 Event created successfully!");
      setTimeout(() => navigate("/host-dashboard"), 1500);
    } catch (error) {
      toast.error(`😟 ${error.message || "Server error"}`);
    }
  };

  // Field configurations with icons
  const fields = [
    { 
      name: "title", 
      label: "Event Title", 
      type: "text", 
      icon: <FaHeading className="text-[#4B3F72]" /> 
    },
    { 
      name: "description", 
      label: "Description", 
      type: "textarea", 
      icon: <FaAlignLeft className="text-[#4B3F72]" /> 
    },
    { 
      name: "collegeName", 
      label: "College Name", 
      type: "text", 
      icon: <FaUniversity className="text-[#4B3F72]" /> 
    },
    { 
      name: "name", 
      label: "Room Number", 
      type: "text", 
      icon: <FaDoorOpen className="text-[#4B3F72]" /> 
    },
    { 
      name: "EventDate", 
      label: "Event Date", 
      type: "date", 
      icon: <FaCalendarAlt className="text-[#4B3F72]" /> 
    },
    { 
      name: "startTime", 
      label: "Start Time", 
      type: "time", 
      icon: <FaClock className="text-[#4B3F72]" /> 
    },
    { 
      name: "endTime", 
      label: "End Time", 
      type: "time", 
      icon: <FaClock className="text-[#4B3F72]" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
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
              onClick={() => navigate(-1)}
              className="flex items-center text-[#4B3F72] hover:text-[#3A315A] px-3 py-2 text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold text-[#4B3F72]"
            >
              Create New Event
            </motion.h1>
            
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10"
      >
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md p-5 border border-[#E3DFFF] hover:shadow-lg transition-all relative overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]"></div>
          
          {/* Form Header */}
          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold text-[#4B3F72] mb-2"
            >
              Event Details
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500"
            >
              Fill in the details to create your event
            </motion.p>
          </div>
          
          {/* Event Creation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="space-y-2"
                >
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                      {field.icon}
                    </div>
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] transition-all hover:border-[#4B3F72]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      {...(field.name === "EventDate" ? { min: today } : {})}
                      className="w-full px-4 py-3 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] transition-all hover:border-[#4B3F72]"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#E3DFFF]">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05, backgroundColor: "#E3DFFF" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-[#E3DFFF] rounded-lg text-[#4B3F72] hover:bg-[#E3DFFF] transition-all font-medium flex items-center justify-center"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center"
              >
                <FaPlus className="mr-2" />
                Create Event
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.main>

      {/* Toast Notifications */}
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