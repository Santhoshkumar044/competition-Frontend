// // CreateCompetition.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CreateCompetition() {
//   const [formData, setFormData] = useState({
//     title: "",
//     organizer: "",
//     mode: "",
//     location: "",
//     prize: "",
//     daysLeft: "",
//     link: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleCreate = () => {
//     const competitions = JSON.parse(localStorage.getItem("competitions")) || [];
//     competitions.push(formData);
//     localStorage.setItem("competitions", JSON.stringify(competitions));
//     navigate("/host-dashboard");
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
//       style={{ backgroundImage: "url('/sk.png')" }}
//     >
//       <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Competition</h2>
//         <div className="flex flex-col gap-4">
//           {["title", "organizer", "mode", "location", "prize", "daysLeft", "link"].map((field) => (
//             <input
//               key={field}
//               name={field}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               value={formData[field]}
//               onChange={handleChange}
//               className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white"
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    // Better validation
    const requiredFields = ["title", "organiser", "mode", "daysLeft", "link"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error(`Please fill the ${field} field.`);
      }
    }

    // Optional: URL format validation
    if (!/^https?:\/\/.+\..+/.test(formData.link)) {
      return toast.error("Please enter a valid URL.");
    }

    const dataToSend = {
      ...formData,
      daysLeft: formData.daysLeft.toString(), // ✅ Ensure it's a string as per schema
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

      toast.success("Competition created successfully!");
      setTimeout(() => navigate("/host-dashboard"), 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center font-['Outfit']"
      style={{ backgroundImage: "url('/sk.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl w-[400px] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Competition</h2>
        <div className="flex flex-col gap-4">
          {["title", "organiser", "mode", "location", "prize", "daysLeft", "link"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="bg-transparent border border-white px-4 py-2 rounded text-white placeholder-white"
              type={field === "daysLeft" ? "number" : "text"}
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

      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
