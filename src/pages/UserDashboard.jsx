import React, { useState } from "react";
import { FaCalendarAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const mockCompetitions = [
  {
    title: "SMART INDIA HACKATHON",
    date: "Aug 20-25, 2025",
    description: "National level coding competition with real-world problem statements.",
    guidelines: "Form a team of 6 members. Follow the themes and submit solutions in 5 days."
  },
  {
    title: "IDEATHON",
    date: "Sep 5-10, 2025",
    description: "Pitch your ideas for social innovation.",
    guidelines: "Team size: 3. Present a working idea and demo."
  },
  {
    title: "HACKATHON 2.0",
    date: "Dec 15-20, 2025",
    description: "Advanced coding marathon focusing on AI and IoT.",
    guidelines: "Max 4 participants. Submit prototype and pitch."
  },
];

const mockEvents = [
  {
    title: "INNOVATION WEEK",
    date: "July 10-15, 2025",
    description: "A week celebrating innovation with workshops and guest lectures.",
    guidelines: "Attend minimum 3 events for certificate."
  },
  {
    title: "TECH EXPO",
    date: "Nov 2-4, 2025",
    description: "Showcase of latest technologies by students and startups.",
    guidelines: "Register online. Carry your college ID."
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("competitions");
  const [profileOpen, setProfileOpen] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const user = {
    name: "Sardor",
    email: "sardor.it2023@citchennai.net",
    department: "Computer Science",
    year: "2027",
  };

  const handleParticipate = (item) => {
    setPopupItem(item);
    setShowConfirmPopup(false);
    setShowDetailsForm(true);
  };

  const handleConfirm = () => {
    setShowConfirmPopup(true);
  };

  const closePopup = () => {
    setPopupItem(null);
    setShowConfirmPopup(false);
    setShowDetailsForm(false);
  };

  const closeConfirmPopup = () => {
    setShowConfirmPopup(false);
  };

  const renderCards = (data) => (
    <div className="flex gap-6 flex-wrap mt-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md px-6 py-4 w-80 transition hover:shadow-lg"
        >
          <h3 className="text-lg font-bold text-blue-700 mb-2">{item.title}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <FaCalendarAlt className="mr-2" />
            {item.date}
          </div>
          <button
            className="bg-white text-blue-600 border border-blue-600 rounded-md px-4 py-1 hover:bg-blue-50"
            onClick={() => handleParticipate(item)}
          >
            view more
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-blue-800 px-8 py-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">EVENTS AND COMPETITIONS</h1>
        <div className="relative">
          <button
            className="bg-blue-600 text-white p-3 rounded-full"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <FaUserCircle size={24} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg w-64 rounded-xl p-4 text-sm z-50">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle size={32} className="text-blue-600" />
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <p><span className="font-semibold">Department:</span> {user.department}</p>
              <p><span className="font-semibold">Year:</span> {user.year}</p>
              <button className="mt-4 w-full border border-red-500 text-red-500 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-red-50">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-md font-semibold ${
            activeTab === "events"
              ? "bg-blue-100 text-blue-700 border-blue-700"
              : "bg-white text-blue-700 border-blue-300"
          }`}
          onClick={() => setActiveTab("events")}
        >
          <FaCalendarAlt /> EVENTS
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-md font-semibold ${
            activeTab === "competitions"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-700 border-blue-300"
          }`}
          onClick={() => setActiveTab("competitions")}
        >
          <FaCalendarAlt /> COMPETITIONS
        </button>
      </div>

      {activeTab === "competitions" && renderCards(mockCompetitions)}
      {activeTab === "events" && renderCards(mockEvents)}

      {popupItem && showDetailsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button onClick={closePopup} className="absolute top-2 right-3 text-gray-500">✖</button>
            <h2 className="text-2xl font-bold mb-2">{popupItem.title}</h2>
            <p className="mb-2"><strong>Description:</strong> {popupItem.description}</p>
            <p className="mb-4"><strong>Guidelines:</strong> {popupItem.guidelines}</p>
            <div className="space-y-4">
            <p><strong>Registration link:</strong>{" "}
            <a 
              href="https://example.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800">
              Click here to register
            </a></p>
            {activeTab === "competitions" && (
            <button onClick={handleConfirm} className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
            Confirm </button>)}
            </div>

          </div>
        </div>
      )}

      {popupItem && showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button onClick={closeConfirmPopup} className="absolute top-2 right-3 text-gray-500">✖</button>
            <h2 className="text-xl font-bold mb-4">Confirmation Details</h2>
            <div className="space-y-2">
              <input type="text" placeholder="Your Name" className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Department" className="w-full border rounded px-3 py-2" />
              <input type="text" placeholder="Graduatuation year" className="w-full border rounded px-3 py-2" />
              <input type="file" className="w-full border rounded px-3 py-2" />
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
