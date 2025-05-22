/**import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
       
      </Routes>
    </Router>
  );
}

export default App;*/
import { useState } from 'react';
import { FiCalendar, FiAward, FiUser, FiChevronDown, FiLogOut } from 'react-icons/fi';

function App() {
  const [activeTab, setActiveTab] = useState('competitions');
  const [showProfile, setShowProfile] = useState(false);

  // Sample data
  const events = [
    { id: 1, title: 'Tech Symposium', date: 'Oct 15, 2025' },
    { id: 2, title: 'Coding Workshop', date: 'Nov 2, 2025' },
    { id: 3, title: 'Alumni Meet', date: 'Dec 10, 2025' },
  ];

  const competitions = [
    { id: 1, title: 'SMART INDIA HACKATHON', date: 'Aug 20-25, 2025' },
    { id: 2, title: 'IDEATHON', date: 'Sep 5-10, 2025' },
    { id: 3, title: 'CISCO HACKATHON', date: 'Dec 15-20, 2025' },
  ];

  const profile = {
    name: 'Sardor',
    department: 'Computer Science',
    year: '2027',
    email: 'sardor.it2023@citchennai.net'
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  return (
    <div className="min-h-screen bg-white p-6 font-sans relative">
      {/* Header - Wrapped in a container with higher z-index */}
      <div className="relative z-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            EVENTS AND COMPETITIONS
          </h1>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 bg-blue-600 p-2 rounded-full shadow-md hover:shadow-lg transition-all text-white"
            >
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white">
                <FiUser size={24} />
              </div>
              <FiChevronDown className={`transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-6 z-50 border border-blue-200">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                    <FiUser size={28} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-blue-900">{profile.name}</h3>
                    <p className="text-sm text-blue-600 break-words">{profile.email}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-blue-800 mb-6">
                  <p><span className="font-medium">Department:</span> {profile.department}</p>
                  <p><span className="font-medium">Year:</span> {profile.year}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
              activeTab === 'events' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
            }`}
          >
            <FiCalendar />
            <span>EVENTS</span>
          </button>
          <button
            onClick={() => setActiveTab('competitions')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
              activeTab === 'competitions' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
            }`}
          >
            <FiAward />
            <span>COMPETITIONS</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {activeTab === 'events' ? (
          events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-blue-200 transition-all border border-blue-100 hover:border-blue-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-800">
                  {event.title}
                </h3>
                <div className="flex items-center text-blue-600 text-sm">
                  <FiCalendar className="mr-2" />
                  {event.date}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          competitions.map((comp) => (
            <div 
              key={comp.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-blue-200 transition-all border border-blue-100 hover:border-blue-200"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-800">
                  {comp.title}
                </h3>
                <div className="flex items-center text-blue-600 text-sm">
                  <FiCalendar className="mr-2" />
                  {comp.date}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors">
                  Participate Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
