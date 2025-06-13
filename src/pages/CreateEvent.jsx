

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

  const handleCreate = async () => {
    try {
      const { title, description, collegeName, roomnumber, eventDate, startTime, endTime } = formData;

      // 🧠 Combine date + time into full Date objects
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
      console.log("Payload to backend:", payload);


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

      toast.success("Event created successfully!");
      setTimeout(() => navigate("/host-dashboard"), 2000);
    } catch (error) {
      toast.error(error.message || "Server error");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
      style={{ backgroundImage: "url('/sk.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
        <div className="flex flex-col gap-4">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
          <input name="collegeName" placeholder="College Name" value={formData.collegeName} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
          <input name="roomnumber" placeholder="Room Number" value={formData.roomnumber} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />

          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />

          <button onClick={handleCreate} className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
            Create
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}