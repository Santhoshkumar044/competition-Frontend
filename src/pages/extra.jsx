//edit event
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    startTime: "",
    endTime: "",
  });

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
        startTime: event.startTime || "",
        endTime: event.endTime || "",
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
            startTime: data.startTime || "",
            endTime: data.endTime || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          alert("Failed to load event data");
          navigate("/admin-dashboard");
        });
    }
  }, [state, id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      collegeName: formData.collegeName,
      startTime: formData.startTime,
      endTime: formData.endTime,
      venueDetails: {
        roomnumber: formData.roomnumber,
        location: formData.location,
        capacity: formData.capacity,
      },
    };

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Update response:", result);

      if (res.ok) {
        alert("Event updated!");
        navigate("/admin-dashboard");
      } else {
        console.error("Update failed:", result);
        alert(result.msg || result.message || "Update failed");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Update failed: Server error");
    }
  };

  if (loading) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0C001E] px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#16002A] p-6 rounded-lg shadow-md border border-cyan-400 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-cyan-300 text-center mb-4">
          Edit Event
        </h1>

        {[
          "title",
          "description",
          "collegeName",
          "roomnumber",
          "location",
          "capacity",
          "startTime",
          "endTime",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize text-sm text-cyan-200">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 border border-cyan-500 focus:outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 py-2 rounded text-white font-semibold tracking-wide uppercase hover:opacity-90"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}