
import React from "react";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#464680] to-[#464680]m:p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl p-4 sm:p-6 md:p-8">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;