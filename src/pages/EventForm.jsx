import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentChecklistForm() {
  const [selectedFields, setSelectedFields] = useState({
    name: false,
    roll: false,
    dept: false,
    year: false,
    phone: false,
    email: false,
    idcard: false,
  });

  const navigate = useNavigate();

  const handleToggle = (field) => {
    setSelectedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    localStorage.setItem("checklistFields", JSON.stringify(selectedFields));
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
      style={{ backgroundImage: "url('/sk.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Form Checklist</h2>

        <div className="flex flex-col gap-3">
          {Object.keys(selectedFields).map((field) => (
            <label key={field} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedFields[field]}
                onChange={() => handleToggle(field)}
                className="accent-white"
              />
              <span className="capitalize">{field}</span>
            </label>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
