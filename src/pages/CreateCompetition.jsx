// CreateCompetition.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCompetition() {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    mode: "",
    location: "",
    prize: "",
    daysLeft: "",
    link: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = () => {
    const competitions = JSON.parse(localStorage.getItem("competitions")) || [];
    competitions.push(formData);
    localStorage.setItem("competitions", JSON.stringify(competitions));
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
      style={{ backgroundImage: "url('/sk.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Competition</h2>
        <div className="flex flex-col gap-4">
          {["title", "organizer", "mode", "location", "prize", "daysLeft", "link"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white"
            />
          ))}
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
