
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CreateCompetition() {
//   const [formData, setFormData] = useState({
//     title: "",
//     organiser: "",
//     mode: "",
//     location: "",
//     prize: "",
//     daysLeft: "",
//     link: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value.toLowerCase(), }));
//   };

//   const handleCreate = async () => {
//     // Better validation
//     const requiredFields = ["title", "organiser", "mode", "daysLeft", "link"];
//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         return toast.error(`Please fill the ${field} field.`);
//       }
//     }

//     // Optional: URL format validation
//     if (!/^https?:\/\/.+\..+/.test(formData.link)) {
//       return toast.error("Please enter a valid URL.");
//     }

//     const dataToSend = {
//       ...formData,
//       daysLeft: formData.daysLeft.toString(), // ✅ Ensure it's a string as per schema
//     };

//     try {
//       const response = await fetch("/api/competitions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(dataToSend),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.msg || "Failed to create competition");
//       }

//       toast.success("Competition created successfully!");
//       setTimeout(() => navigate("/host-dashboard"), 1500);
//     } catch (err) {
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
//       style={{ backgroundImage: "url('/sk.png')" }}
//     >
//       <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Competition</h2>
//         <div className="flex flex-col gap-4">
//           {["title", "organiser", "mode", "location", "prize", "daysLeft", "link"].map((field) => (
//             <input
//               key={field}
//               name={field}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={formData[field]}
//               onChange={handleChange}
//               className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white"
//               type={field === "daysLeft" ? "number" : "text"}
//             />
//           ))}
//           <button
//             onClick={handleCreate}
//             className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
//           >
//             Create
//           </button>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={2500} />
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    
    // Better validation
    const requiredFields = ["title", "organiser", "mode", "daysLeft", "link"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error(`Please fill the ${field} field.`);
      }
    }

    // URL format validation
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans antialiased">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-60 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg transition-all hover:bg-indigo-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Competition
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -right-20 top-0 w-64 h-64 bg-white/5 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white relative z-10">Launch Your Competition</h2>
            <p className="text-indigo-100 relative z-10">Fill in the details to create an exciting competition</p>
          </div>
          
          {/* Competition Creation Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "title", label: "Competition Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                { name: "organiser", label: "Organiser", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "mode", label: "Mode", type: "text", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { name: "location", label: "Location", type: "text", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { name: "prize", label: "Prize", type: "text", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "daysLeft", label: "Days Left", type: "number", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "link", label: "Registration Link", type: "url", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                    </svg>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={["title", "organiser", "mode", "daysLeft", "link"].includes(field.name)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 font-medium flex items-center justify-center group"
              >
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Competition
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-10 right-10 z-0">
        <div className="w-32 h-32 bg-purple-300/20 rounded-full animate-float"></div>
      </div>
      <div className="fixed top-1/4 left-5 z-0">
        <div className="w-24 h-24 bg-indigo-300/20 rounded-full animate-float animation-delay-2000"></div>
      </div>

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
        toastClassName="rounded-lg shadow-xl"
        bodyClassName="font-sans p-4"
      />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}