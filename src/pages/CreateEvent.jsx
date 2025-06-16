
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEvent() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, collegeName, roomnumber, eventDate, startTime, endTime } = formData;

      // Combine date + time into full Date objects
      const formattedStartTime = new Date(`${eventDate}T${startTime}`);
      const formattedEndTime = new Date(`${eventDate}T${endTime}`);

      const payload = {
        title,
        description,
        collegeName,
        roomnumber,
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
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("🎉 Event created successfully!");
      setTimeout(() => navigate("/host-dashboard"), 1500);
    } catch (error) {
      toast.error(`😟 ${error.message || "Server error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans antialiased">
      {/* Artistic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-60 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-20 items-center py-4 sm:py-0">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all hover:bg-indigo-50 mb-3 sm:mb-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span className="text-sm sm:text-base">Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent my-3 sm:my-0">
              Create New Event
            </h1>
            <div className="w-0 sm:w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform transition-all hover:shadow-md sm:hover:shadow-2xl">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -right-16 top-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white relative z-10">Craft Your Event</h2>
            <p className="text-indigo-100 relative z-10 text-sm sm:text-base">Fill in the details to create a memorable experience</p>
          </div>
          
          {/* Event Creation Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                { name: "title", label: "Event Title", type: "text", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
                { name: "description", label: "Description", type: "text", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
                { name: "collegeName", label: "College Name", type: "text", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { name: "roomnumber", label: "Room Number", type: "text", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                { name: "eventDate", label: "Event Date", type: "date", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                { name: "startTime", label: "Start Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { name: "endTime", label: "End Time", type: "time", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((field) => (
                <div key={field.name} className="space-y-1 sm:space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300 text-sm sm:text-base"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-indigo-300 text-sm sm:text-base"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all hover:shadow-sm font-medium flex items-center justify-center text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 font-medium flex items-center justify-center group text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Event
              </button>
            </div>
          </form>
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
        toastClassName="rounded-lg shadow-xl"
        bodyClassName="font-sans p-3 sm:p-4"
      />

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 z-0">
        <div className="w-20 h-20 sm:w-32 sm:h-32 bg-purple-300/20 rounded-full animate-float"></div>
      </div>
      <div className="fixed top-1/4 left-2 sm:left-5 z-0">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-indigo-300/20 rounded-full animate-float animation-delay-2000"></div>
      </div>

      {/* Add custom animations in your CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-10px, 15px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
        
        @media (max-width: 640px) {
          .animate-blob {
            animation: none;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}