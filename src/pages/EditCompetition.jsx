import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
      // Fetch from backend using ID
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
        .catch(() => {
          alert("Failed to load competition data");
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
        alert("Competition updated!");
        navigate("/host-dashboard");
      } else {
        console.error("Backend error:", result);
        alert(result.message || result.msg || "Update failed");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network or server error");
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0C001E] flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#16002A] p-8 rounded-lg shadow-md w-full max-w-xl border border-cyan-400 space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-6 text-cyan-300 text-center">
          Edit Competition
        </h2>

        {[
          { label: "Title", name: "title" },
          { label: "Location", name: "location" },
          { label: "Organiser", name: "organiser" },
          { label: "Prize", name: "prize" },
          { label: "Mode", name: "mode" },
          { label: "Days Left", name: "daysLeft", type: "number" },
          { label: "Link", name: "link" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-white bg-[#1a1a2e] rounded shadow focus:outline-none"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded font-semibold uppercase tracking-wide"
        >
          Update
        </button>
      </form>
    </div>
  );
}
