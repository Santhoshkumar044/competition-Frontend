// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "ABOUT US",
    image: "/images/about.jpg",
    subtitle: "Learn, Innovate, Transform... Welcome 2025 Applicants",
  },
  {
    title: "FAMOUS EVENTS",
    image: "/images/events.jpg",
  },
  {
    title: "UPCOMING EVENTS",
    image: "/images/upcoming.jpg",
    subtitle: "CITIL SDG Hackathon, 19th & 20th Feb 2025",
  },
  {
    title: "ACHIEVEMENTS",
    image: "/images/achievements.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b shadow-sm">
        <h1 className="text-2xl font-bold text-blue-700">Campus Connect</h1>
        <div>
          <Link to="/login">
            <button className="text-blue-700 border border-blue-700 px-5 py-2 mr-4 rounded hover:bg-blue-700 hover:text-white transition">
              LOGIN
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition">
              SIGN UP
            </button>
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <main className="px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition bg-white"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="text-gray-600 text-sm">{card.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-6 text-center text-sm text-gray-500">
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <span className="hover:text-blue-700 cursor-pointer">FAQ</span>
          <span className="hidden md:inline">|</span>
          <span className="hover:text-blue-700 cursor-pointer">Social Handles</span>
          <span className="hidden md:inline">|</span>
          <span className="hover:text-blue-700 cursor-pointer">Address</span>
        </div>
      </footer>
    </div>
  );
}
