// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function EditCompetition() {
//   const { state } = useLocation();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     organiser: "",
//     prize: "",
//     mode: "",
//     daysLeft: "",
//     link: "",
//   });

//   useEffect(() => {
//     const comp = state?.data;
//     if (comp) {
//       setFormData({
//         title: comp.title || "",
//         location: comp.location || "",
//         organiser: comp.organiser || "",
//         prize: comp.prize || "",
//         mode: comp.mode || "",
//         daysLeft: comp.daysLeft || "",
//         link: comp.link || "",
//       });
//       setLoading(false);
//     } else {
//       fetch(`/api/competitions/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setFormData({
//             title: data.title || "",
//             location: data.location || "",
//             organiser: data.organiser || "",
//             prize: data.prize || "",
//             mode: data.mode || "",
//             daysLeft: data.daysLeft || "",
//             link: data.link || "",
//           });
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Fetch error:", err);
//           toast.error("Failed to load competition data");
//           navigate("/host-dashboard");
//         });
//     }
//   }, [state, id, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/competitions/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         toast.success("🎉 Competition updated successfully!");
//         setTimeout(() => navigate("/host-dashboard"), 1500);
//       } else {
//         toast.error(result.msg || result.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       toast.error("😟 Update failed: Server error");
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//         <p className="mt-4 text-lg font-medium text-indigo-700">Loading competition details...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans antialiased">
//       {/* Header */}
//       <header className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-20 items-center">
//             <button 
//               onClick={() => navigate(-1)}
//               className="flex items-center text-[#4B3F72] hover:text-[#4B3F72] px-4 py-2 rounded-lg transition-all hover:bg-indigo-50"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//               </svg>
//               Back to Dashboard
//             </button>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Competition Editor
//             </h1>
//             <div className="w-24"></div> {/* Spacer for balance */}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from- to-purple-600 p-6">
//             <h2 className="text-2xl font-bold text-white">Edit Competition Details</h2>
//             <p className="text-indigo-100">Update the information below to modify your competition</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 { name: "title", label: "Competition Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
//                 { name: "location", label: "Location", type: "text", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
//                 { name: "organiser", label: "Organiser", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
//                 { name: "prize", label: "Prize", type: "text", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
//                 { name: "mode", label: "Mode", type: "text", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
//                 { name: "daysLeft", label: "Days Left", type: "number", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
//                 { name: "link", label: "Registration Link", type: "text", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
//               ].map((field) => (
//                 <div key={field.name} className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-gray-700">
//                     <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
//                     </svg>
//                     {field.label}
//                   </label>
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm font-medium flex items-center justify-center"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 font-medium flex items-center justify-center"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 Update Competition
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>

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
//         toastClassName="rounded-lg shadow-xl"
//         bodyClassName="font-sans p-4"
//       />
//     </div>
//   );
// }

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

const _motion = motion;
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

export default function EditCompetition() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    organiser: "",
    prize: "",
    mode: "",
    daysLeft: "",
    link: "",
  });

  useEffect(() => {
    const comp = state?.data;
    if (comp) {
      setFormData({
        title: comp.title || "",
        location: comp.location || "",
        organiser: comp.organiser || "",
        prize: comp.prize || "",
        mode: comp.mode || "",
        daysLeft: comp.daysLeft || "",
        link: comp.link || "",
      });
      setLoading(false);
    } else {
      fetch(`/api/competitions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || "",
            location: data.location || "",
            organiser: data.organiser || "",
            prize: data.prize || "",
            mode: data.mode || "",
            daysLeft: data.daysLeft || "",
            link: data.link || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          toast.error("Failed to load competition data");
          navigate("/host-dashboard");
        });
    }
  }, [state, id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/competitions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("🎉 Competition updated successfully!");
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
        <p className="mt-4 text-lg font-medium text-[#4B3F72]">Loading competition details...</p>
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
              Edit Competition
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
              Update Competition Details
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500"
            >
              Modify the information below to update your competition
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "title", label: "Competition Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                { name: "location", label: "Location", type: "text", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { name: "organiser", label: "Organiser", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "prize", label: "Prize", type: "text", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "mode", label: "Mode", type: "text", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { name: "daysLeft", label: "Days Left", type: "number", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "link", label: "Registration Link", type: "text", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
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
                className="flex items-center justify-center px-6 py-3  bg-[#FFE5E6] text-[#EF767A] rounded-lg hover:bg-[#f8d5d6] transition-colors       "     >
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
                Update Competition
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
