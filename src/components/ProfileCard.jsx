

// export default ProfileCard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    RegNo: "",
    email: "",
    batch: "",
    Gender: "",
    domain: "",
    Dept: "",
    competitionWon: "",
    competitionParticipated: "",
    bio: "",
  });
  
  useEffect(() => {
    fetch("/api/profile/me", { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401) {
          console.warn("🛑 Unauthorized. Skipping profile fetch.");
          return {};
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          console.warn("Empty profile data or unauthorized.");
          return;
        }

        setFormData({
          fullName: data.fullName || "",
          RegNo: data.RegNo || "",
          email: data.email || "",
          batch: data.batch || "",
          Gender: data.Gender || "",
          domain: data.domain || "",
          Dept: data.Dept || "",
          competitionWon: data.competitionStats?.won?.toString() || "",
          competitionParticipated: data.competitionStats?.attended?.toString() || "",
          bio: data.bio || "",
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "fullName", "RegNo", "email", "batch", "Gender", "domain", "Dept", "bio",
      "competitionWon", "competitionParticipated"
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      toast.warn(`Please fill all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    const payload = {
      fullName: formData.fullName,
      RegNo: formData.RegNo,
      email: formData.email,
      batch: formData.batch,
      Gender: formData.Gender,
      domain: formData.domain,
      Dept: formData.Dept,
      bio: formData.bio,
      competitionStats: {
        won: isNaN(Number(formData.competitionWon)) ? 0 : Number(formData.competitionWon),
        attended: isNaN(Number(formData.competitionParticipated)) ? 0 : Number(formData.competitionParticipated)
      }
    };

    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("🎉 Profile saved successfully!", { theme: 'dark' });
        setTimeout(() => {
          navigate("/user");
        }, 1500);
      } else {
        throw new Error(result.error || "Failed to save profile.");
      }
    } catch (error) {
      console.error("❌ Save error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 w-full text-[#1e1e4d] font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          <button
            onClick={() => navigate("/home")}
            className="bg-[#1e1e4d] hover:bg-[#42c3d9] text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 transition-all text-sm sm:text-base"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/user")}
            className="bg-[#1e1e4d] hover:bg-[#42c3d9] text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 transition-all text-sm sm:text-base"
          >
            ← Back to Dashboard
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-0">Edit Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4 md:gap-y-5">
        <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
        <Input label="Register Number" name="RegNo" value={formData.RegNo} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Input label="Batch" name="batch" value={formData.batch} onChange={handleChange} />

        <div>
          <label className="block text-xs sm:text-sm mb-1 font-medium">Gender</label>
          <select 
            name="Gender" 
            value={formData.Gender} 
            onChange={handleChange} 
            className="w-full p-2 sm:p-3 bg-white border border-[#1e1e4d] text-gray-700 text-sm sm:text-base"
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <Input label="Interested Domain" name="domain" value={formData.domain} onChange={handleChange} />

        <div>
          <label className="block text-xs sm:text-sm mb-1 font-medium">Department</label>
          <select 
            name="Dept" 
            value={formData.Dept} 
            onChange={handleChange} 
            className="w-full p-2 sm:p-3 bg-white border border-[#1e1e4d] text-gray-700 text-sm sm:text-base"
          >
            <option value="" disabled>Select Department</option>
            <option>CSE</option>
            <option>IT</option>
            <option>AIDS</option>
            <option>AIML</option>
            <option>CSBS</option>
            <option>ECE</option>
            <option>ECE(ACT)</option>
            <option>ECE(VLSI)</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>BME</option>
            <option>CSE(CS)</option>
            <option>MCT</option>
            <option>CIVIL</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm mb-1 font-medium">Competition</label>
          <input
            name="competitionWon"
            value={formData.competitionWon}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 mb-1 sm:mb-2 bg-white border border-[#1e1e4d] placeholder-gray-400 text-sm sm:text-base"
            placeholder="Won"
          />
          <input
            name="competitionParticipated"
            value={formData.competitionParticipated}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 bg-white border border-[#1e1e4d] placeholder-gray-400 text-sm sm:text-base"
            placeholder="Participated"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs sm:text-sm mb-1 font-medium">BIO</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 h-32 sm:h-40 md:h-48 bg-white border border-[#1e1e4d] placeholder-gray-400 resize-none text-sm sm:text-base"
            placeholder="Your Bio"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 sm:mt-8">
        <button
          onClick={handleSubmit}
          className="bg-[#1e1e4d] hover:bg-[#42c3d9] text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 transition-all text-sm sm:text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-xs sm:text-sm mb-1 font-medium">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 sm:p-3 bg-white border border-[#1e1e4d] placeholder-gray-400 text-sm sm:text-base"
      placeholder={`Your ${label}`}
    />
  </div>
);

export default ProfileCard;