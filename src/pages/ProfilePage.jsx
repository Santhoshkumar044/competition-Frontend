import React from "react";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e4d] to-[#42c3d9] p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="border px-3 py-1 rounded-lg"
            />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-10 h-10 rounded-full"
              alt="User"
            />
          </div>
        </div>

        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
