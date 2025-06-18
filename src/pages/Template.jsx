
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function TemplatePage() {
//   const [templates, setTemplates] = useState([]);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [editingTemplate, setEditingTemplate] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     collegeName: "",
//     roomnumber: "",
//     eventDate: "",
//     startTime: "",
//     endTime: "",
//   });

//   const navigate = useNavigate();

//   // Load templates from localStorage on component mount
//   useEffect(() => {
//     const savedTemplates = localStorage.getItem("eventTemplates");
//     if (savedTemplates) {
//       setTemplates(JSON.parse(savedTemplates));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateTemplate = () => {
//     setEditingTemplate(null);
//     setFormData({
//       title: "",
//       description: "",
//       collegeName: "",
//       roomnumber: "",
//       eventDate: "",
//       startTime: "",
//       endTime: "",
//     });
//     setShowCreateForm(true);
//   };

//   const handleEditTemplate = (template) => {
//     setEditingTemplate(template.id);
//     setFormData({
//       title: template.title,
//       description: template.description,
//       collegeName: template.collegeName,
//       roomnumber: template.roomnumber,
//       eventDate: template.eventDate,
//       startTime: template.startTime,
//       endTime: template.endTime,
//     });
//     setShowCreateForm(true);
//   };

//   const handleSaveTemplate = (e) => {
//     e.preventDefault();
//     try {
//       const { title, description, collegeName, roomnumber, eventDate, startTime, endTime } = formData;

//       if (!title || !description || !collegeName || !roomnumber || !eventDate || !startTime || !endTime) {
//         throw new Error("All fields are required");
//       }

//       const newTemplate = {
//         id: editingTemplate || Date.now(),
//         title,
//         description,
//         collegeName,
//         roomnumber,
//         eventDate,
//         startTime,
//         endTime,
//         isPosted: false,
//       };

//       let updatedTemplates;
//       if (editingTemplate) {
//         updatedTemplates = templates.map(t => 
//           t.id === editingTemplate ? newTemplate : t
//         );
//       } else {
//         updatedTemplates = [...templates, newTemplate];
//       }

//       setTemplates(updatedTemplates);
//       localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));
//       setShowCreateForm(false);
//       toast.success(`🎉 Template ${editingTemplate ? "updated" : "created"} successfully!`);
//     } catch (error) {
//       toast.error(`😟 ${error.message || "Failed to save template"}`);
//     }
//   };

//   const handlePostTemplate = async (templateId) => {
//     try {
//       const templateToPost = templates.find(t => t.id === templateId);
//       if (!templateToPost) {
//         throw new Error("Template not found");
//       }

//       // Combine date + time into full Date objects
//       const formattedStartTime = new Date(`${templateToPost.eventDate}T${templateToPost.startTime}`);
//       const formattedEndTime = new Date(`${templateToPost.eventDate}T${templateToPost.endTime}`);

//       const payload = {
//         title: templateToPost.title,
//         description: templateToPost.description,
//         collegeName: templateToPost.collegeName,
//         roomnumber: templateToPost.roomnumber,
//         startTime: formattedStartTime.toISOString(),
//         endTime: formattedEndTime.toISOString(),
//       };

//       const response = await fetch("/api/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to post event");
//       }

//       // Update template to mark it as posted
//       const updatedTemplates = templates.map(t => 
//         t.id === templateId ? { ...t, isPosted: true } : t
//       );
//       setTemplates(updatedTemplates);
//       localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));

//       toast.success("🎉 Event posted successfully to dashboard!");
//     } catch (error) {
//       toast.error(`😟 ${error.message || "Server error"}`);
//     }
//   };

//   const handleDeleteTemplate = (templateId) => {
//     const updatedTemplates = templates.filter(t => t.id !== templateId);
//     setTemplates(updatedTemplates);
//     localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));
//     toast.success("Template deleted successfully");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans antialiased">
//       {/* Background Elements */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
//         <div className="absolute top-20 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute top-60 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Header */}
//       <header className="relative bg-white shadow-lg z-10">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
//           <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-20 items-center py-3 sm:py-0">
//             <div className="flex items-center w-full sm:w-auto justify-between">
//               <button 
//                 onClick={() => navigate(-1)}
//                 className="flex items-center text-indigo-600 hover:text-indigo-800 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all hover:bg-indigo-50 text-sm sm:text-base"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//                 </svg>
//                 Back
//               </button>
//               <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Event Templates
//               </h1>
//               <button
//                 onClick={handleCreateTemplate}
//                 className="sm:hidden px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center text-sm"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//                 </svg>
//                 New
//               </button>
//             </div>
//             <button
//               onClick={handleCreateTemplate}
//               className="hidden sm:flex px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all items-center text-sm sm:text-base"
//             >
//               <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//               Create Template
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 z-10">
//         {/* Template Creation Form (conditionally rendered) */}
//         {showCreateForm && (
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform transition-all mb-6 sm:mb-8">
//             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-white">
//                 {editingTemplate ? "Edit Template" : "Create New Template"}
//               </h2>
//             </div>
            
//             <form onSubmit={handleSaveTemplate} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 {[
//                   { name: "title", label: "Event Title", type: "text" },
//                   { name: "description", label: "Description", type: "text" },
//                   { name: "collegeName", label: "College Name", type: "text" },
//                   { name: "roomnumber", label: "Room Number", type: "text" },
//                   { name: "eventDate", label: "Event Date", type: "date" },
//                   { name: "startTime", label: "Start Time", type: "time" },
//                   { name: "endTime", label: "End Time", type: "time" },
//                 ].map((field) => (
//                   <div key={field.name} className="space-y-1 sm:space-y-2">
//                     <label className="flex items-center text-sm font-medium text-gray-700">
//                       {field.label}
//                     </label>
//                     {field.name === "description" ? (
//                       <textarea
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         required
//                         rows="3"
//                         className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300 text-sm sm:text-base"
//                       />
//                     ) : (
//                       <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300 text-sm sm:text-base"
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateForm(false)}
//                   className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm font-medium flex items-center justify-center text-sm sm:text-base"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                   </svg>
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 font-medium flex items-center justify-center group text-sm sm:text-base"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   {editingTemplate ? "Update" : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Templates List */}
//         <div className="space-y-4 sm:space-y-6">
//           <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Your Seasonal Event Templates</h2>
          
//           {templates.length === 0 ? (
//             <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 text-center">
//               <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
//               </svg>
//               <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">No templates yet</h3>
//               <p className="mt-1 text-sm text-gray-500">Create your first seasonal event template to get started</p>
//               <button
//                 onClick={handleCreateTemplate}
//                 className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm sm:text-base"
//               >
//                 Create Template
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {templates.map((template) => (
//                 <div key={template.id} className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                   <div className="p-4 sm:p-6">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">{template.title}</h3>
//                       {template.isPosted && (
//                         <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           Posted
//                         </span>
//                       )}
//                     </div>
//                     <p className="mt-2 text-sm text-gray-600 line-clamp-2">{template.description}</p>
//                     <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
//                         </svg>
//                         {template.collegeName} - {template.roomnumber}
//                       </div>
//                       <div className="flex items-center">
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                         </svg>
//                         {template.eventDate}
//                       </div>
//                       <div className="flex items-center">
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                         {template.startTime} - {template.endTime}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
//                     <button
//                       onClick={() => handleEditTemplate(template)}
//                       className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center sm:justify-start text-sm"
//                     >
//                       <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
//                       </svg>
//                       Edit
//                     </button>
//                     <div className="flex justify-center sm:justify-end gap-3 sm:gap-4">
//                       <button
//                         onClick={() => handleDeleteTemplate(template.id)}
//                         className="text-red-600 hover:text-red-900 font-medium flex items-center text-sm"
//                       >
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                         </svg>
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => handlePostTemplate(template.id)}
//                         disabled={template.isPosted}
//                         className={`font-medium flex items-center text-sm ${template.isPosted ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:text-green-900"}`}
//                       >
//                         <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
//                         </svg>
//                         Post
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Toast Notifications */}
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
//         bodyClassName="font-sans p-3 sm:p-4"
//       />
//     </div>
//   );
// }          
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaEdit, FaTrash, FaExternalLinkAlt, FaChartBar, FaTimes, FaPlus, FaUserCircle, FaArrowLeft } from "react-icons/fa";

export default function TemplatePage() {
  const [templates, setTemplates] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collegeName: "",
    roomnumber: "",
    eventDate: "",
    startTime: "",
    endTime: "",
  });

  const navigate = useNavigate();

  // Load templates from localStorage on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem("eventTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setFormData({
      title: "",
      description: "",
      collegeName: "",
      roomnumber: "",
      eventDate: "",
      startTime: "",
      endTime: "",
    });
    setShowCreateForm(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template.id);
    setFormData({
      title: template.title,
      description: template.description,
      collegeName: template.collegeName,
      roomnumber: template.roomnumber,
      eventDate: template.eventDate,
      startTime: template.startTime,
      endTime: template.endTime,
    });
    setShowCreateForm(true);
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    try {
      const { title, description, collegeName, roomnumber, eventDate, startTime, endTime } = formData;

      if (!title || !description || !collegeName || !roomnumber || !eventDate || !startTime || !endTime) {
        throw new Error("All fields are required");
      }

      const newTemplate = {
        id: editingTemplate || Date.now(),
        title,
        description,
        collegeName,
        roomnumber,
        eventDate,
        startTime,
        endTime,
        isPosted: false,
      };

      let updatedTemplates;
      if (editingTemplate) {
        updatedTemplates = templates.map(t => 
          t.id === editingTemplate ? newTemplate : t
        );
      } else {
        updatedTemplates = [...templates, newTemplate];
      }

      setTemplates(updatedTemplates);
      localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));
      setShowCreateForm(false);
      toast.success(`🎉 Template ${editingTemplate ? "updated" : "created"} successfully!`);
    } catch (error) {
      toast.error(`😟 ${error.message || "Failed to save template"}`);
    }
  };

  const handlePostTemplate = async (templateId) => {
    try {
      const templateToPost = templates.find(t => t.id === templateId);
      if (!templateToPost) {
        throw new Error("Template not found");
      }

      // Combine date + time into full Date objects
      const formattedStartTime = new Date(`${templateToPost.eventDate}T${templateToPost.startTime}`);
      const formattedEndTime = new Date(`${templateToPost.eventDate}T${templateToPost.endTime}`);

      const payload = {
        title: templateToPost.title,
        description: templateToPost.description,
        collegeName: templateToPost.collegeName,
        roomnumber: templateToPost.roomnumber,
        startTime: formattedStartTime.toISOString(),
        endTime: formattedEndTime.toISOString(),
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to post event");
      }

      // Update template to mark it as posted
      const updatedTemplates = templates.map(t => 
        t.id === templateId ? { ...t, isPosted: true } : t
      );
      setTemplates(updatedTemplates);
      localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));

      toast.success("🎉 Event posted successfully to dashboard!");
    } catch (error) {
      toast.error(`😟 ${error.message || "Server error"}`);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem("eventTemplates", JSON.stringify(updatedTemplates));
    toast.success("Template deleted successfully");
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

      {/* 🚀 Navbar */}
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
              className="flex items-center text-gray-700 hover:text-[#4B3F72] px-3 py-2 text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#4B3F72] to-[#3A315A] bg-clip-text text-transparent">
              Event Templates
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateTemplate}
              className="px-5 py-2 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center"
            >
              <FaPlus className="mr-2" />
              Create Template
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        {/* Template Creation Form (conditionally rendered) */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow p-6 mb-8 border border-[#E3DFFF]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#4B3F72]">
                  {editingTemplate ? "Edit Template" : "Create New Template"}
                </h2>
                <motion.button 
                  whileHover={{ rotate: 90, backgroundColor: "#E3DFFF" }}
                  onClick={() => setShowCreateForm(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>
              
              <form onSubmit={handleSaveTemplate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "title", label: "Event Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                    { name: "description", label: "Description", type: "text", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
                    { name: "collegeName", label: "College Name", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                    { name: "roomnumber", label: "Room Number", type: "text", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                    { name: "eventDate", label: "Event Date", type: "date", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { name: "startTime", label: "Start Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { name: "endTime", label: "End Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  ].map((field) => (
                    <motion.div 
                      key={field.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <label className="flex items-center text-sm font-medium text-[#4B3F72]">
                        <svg className="w-5 h-5 mr-2 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                        </svg>
                        {field.label}
                      </label>
                      {field.name === "description" ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          rows="3"
                          className="w-full px-4 py-3 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all hover:border-[#4B3F72]"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#E3DFFF] rounded-lg focus:ring-2 focus:ring-[#4B3F72] focus:border-[#4B3F72] text-gray-900 placeholder-gray-400 transition-all hover:border-[#4B3F72]"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#E3DFFF]">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#E3DFFF" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 border border-[#E3DFFF] rounded-lg text-[#4B3F72] hover:bg-[#E3DFFF] transition-colors font-medium flex items-center justify-center"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: "#3A315A" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {editingTemplate ? "Update Template" : "Save Template"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Templates List */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-semibold text-[#4B3F72] mb-1">
                Your Event Templates
              </h1>
              <p className="text-gray-500">
                Create and manage templates for your seasonal events
              </p>
            </div>
            <div className="text-sm text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full">
              {templates.length} {templates.length === 1 ? 'template' : 'templates'}
            </div>
          </motion.div>
          
          {templates.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="bg-[#E3DFFF] bg-opacity-20 p-8 rounded-full mb-6">
                <FaPlus className="text-[#4B3F72] text-4xl opacity-60" />
              </div>
              <p className="text-lg font-light text-gray-500 mb-6">No templates found</p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(75, 63, 114, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateTemplate}
                className="px-6 py-3 bg-gradient-to-r from-[#4B3F72] to-[#3A315A] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
              >
                <FaPlus className="mr-2" />
                Create New Template
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-xl shadow-md p-5 border border-[#E3DFFF] hover:shadow-lg transition-all relative overflow-hidden"
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B3F72] to-[#3A315A]"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-bold text-[#4B3F72]">{template.title}</h2>
                    {template.isPosted && (
                      <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                      >
                        Posted
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <span>{template.collegeName} - {template.roomnumber}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span>Date: {template.eventDate}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span>Time: {template.startTime} - {template.endTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#E3DFFF] bg-opacity-30 flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-[#4B3F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                      </div>
                      <span className="line-clamp-2">{template.description}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEditTemplate(template)}
                      className="flex items-center px-4 py-2 bg-[#E3DFFF] text-[#4B3F72] rounded-lg hover:bg-[#d5d0f0] transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="flex items-center px-5 py-2 bg-[#E3DFFF] text-[#4B3F72] rounded-lg hover:bg-[#d5d0f0] transition-colors"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#d5d0f0" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePostTemplate(template.id)}
                      disabled={template.isPosted}
                      className={`flex items-center px-4 py-2 ${template.isPosted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#E3DFFF] text-[#4B3F72] hover:bg-[#d5d0f0]'} rounded-lg transition-colors`}
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      {template.isPosted ? 'Posted' : 'Post'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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