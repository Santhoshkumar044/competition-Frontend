
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

console.log(motion);
export default function CreateCompetition() {
  const [formData, setFormData] = useState({
    title: "",
    organiser: "",
    mode: "",
    location: "",
    prize: "",
    daysLeft: "",
    link: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ["title", "organiser", "mode", "daysLeft", "link"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error(`Please fill the ${field} field.`);
      }
    }

    if (!/^https?:\/\/.+\..+/.test(formData.link)) {
      return toast.error("Please enter a valid URL.");
    }

    const dataToSend = {
      ...formData,
      daysLeft: formData.daysLeft.toString(),
    };

    try {
      const response = await fetch("/api/competitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || "Failed to create competition");
      }

      toast.success("🎉 Competition created successfully!");
      setTimeout(() => navigate("/host-dashboard"), 1500);
    } catch (err) {
      toast.error(`😟 ${err.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#1E1E1E] font-sans">
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

      {/* 🚀 Header */}
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
              className="flex items-center text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>
            
            <h1 className="text-xl font-semibold text-[#4B3F72]">
              Create New Competition
            </h1>
            
            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#E3DFFF]"
        >
          {/* Form Header with Gradient */}
          <div className="bg-gradient-to-r from-[#4B3F72] to-[#3A315A] p-6">
            <h2 className="text-xl font-semibold text-white">Competition Details</h2>
            <p className="text-[#E3DFFF] mt-1">Provide information about your competition</p>
          </div>
          
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "title", label: "Competition Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                { name: "organiser", label: "Organiser", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "mode", label: "Mode", type: "text", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { name: "location", label: "Location", type: "text", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { name: "prize", label: "Prize", type: "text", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "daysLeft", label: "Days Left", type: "number", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "link", label: "Registration Link", type: "url", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
              ].map((field, index) => (
                <motion.div 
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center text-sm font-medium text-[#4B3F72]">
                    <svg className="w-4 h-4 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    required={["title", "organiser", "mode", "daysLeft", "link"].includes(field.name)}
                    className="w-full px-4 py-2 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] transition-all hover:border-[#4B3F72] bg-[#F5F7FA]"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-[#E3DFFF]">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E3DFFF" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-[#E3DFFF] rounded-lg text-[#4B3F72] hover:bg-[#E3DFFF] transition-colors"
              >
                Cancel
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <FaPlus className="mr-2" />
                Create Competition
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>

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