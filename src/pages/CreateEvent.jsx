// CreateEvent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collegeName: "",
    venue: {
      roomNumber: "",
      location: "",
      capacity: "",
    },
    eventDate: "",
    startTime: "",
    endTime: "",
    registrationStatus: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["roomNumber", "location", "capacity"].includes(name)) {
      setFormData({ ...formData, venue: { ...formData.venue, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreate = () => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(formData);
    localStorage.setItem("events", JSON.stringify(events));
    navigate("/event-form");
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

          <div className="flex flex-col gap-2">
            <input name="roomNumber" placeholder="Room Number" value={formData.venue.roomNumber} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
            <input name="location" placeholder="Location" value={formData.venue.location} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
            <input name="capacity" placeholder="Capacity" value={formData.venue.capacity} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />
          </div>

          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white" />
          <input name="registrationStatus" placeholder="Registration Status" value={formData.registrationStatus} onChange={handleChange} className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white" />

          <button
            onClick={handleCreate}
            className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
