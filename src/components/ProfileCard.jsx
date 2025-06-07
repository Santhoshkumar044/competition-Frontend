import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    registerNumber: "",
    batch: "",
    gender: "",
    domain: "",
    department: "",
    competitionWon: "",
    competitionParticipated: "",
    bio: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setFormData({
          fullName: data.fullName || "",
          registerNumber: data.registerNumber || "",
          batch: data.batch || "",
          gender: data.gender || "",
          domain: data.domain || "",
          department: data.department || "",
          competitionWon: data.competitionWon || "",
          competitionParticipated: data.competitionParticipated || "",
          bio: data.bio || "",
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => alert("Profile Updated Successfully!"))
      .catch(err => alert("Error updating profile."));
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl shadow-xl p-10 w-full text-[#1e1e4d] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-[#1e1e4d] hover:bg-[#42c3d9] text-white px-5 py-2 transition-all"
        >
          Home
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex items-center mb-6">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-20 h-20 border-4 border-[#42c3d9]"
          // removed rounded-full here
        />
        <div className="ml-5">
          <h2 className="text-xl font-semibold">{profile.name || "Your Name"}</h2>
          <p className="text-gray-600">{profile.email || "your@email.com"}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <label className="block text-sm mb-1 font-medium">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Your First Name"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Register Number</label>
          <input
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Your Register Number"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Batch</label>
          <input
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Your Graduation Year"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Gender</label>
          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Your Gender"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Interested Domain</label>
          <input
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Your Domain"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] text-gray-700"
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
          <label className="block text-sm mb-1 font-medium">Competition</label>
          <input
            name="competitionWon"
            value={formData.competitionWon}
            onChange={handleChange}
            className="w-full p-3 mb-2 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Won"
          />
          <input
            name="competitionParticipated"
            value={formData.competitionParticipated}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-[#1e1e4d] placeholder-gray-400"
            placeholder="Participated"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 font-medium">BIO</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 h-48 bg-white border border-[#1e1e4d] placeholder-gray-400 resize-none"
            placeholder="Your Bio"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          className="bg-[#1e1e4d] hover:bg-[#42c3d9] text-white px-6 py-3 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
