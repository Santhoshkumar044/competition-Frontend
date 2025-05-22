import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, HelpCircle } from "lucide-react";

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

const faqData = [
  {
    question: "What is the event about?",
    answer:
      "The event is about bringing together students from different colleges to participate in fun and educational competitions.",
  },
  {
    question: "How can I register for the event?",
    answer:
      "You can register through our online portal by filling out a simple registration form.",
  },
  {
    question: "Is there a participation fee?",
    answer:
      "No, the event is completely free for all students. Just sign up and you're good to go!",
  },
  {
    question: "What are the prizes for winners?",
    answer:
      "We offer exciting prizes including certificates, vouchers, and trophies for the winners of each competition.",
  },
  {
    question: "Can I participate in multiple events?",
    answer:
      "Yes, you can register for multiple events, but make sure the timings do not overlap.",
  },
  {
    question: "Will there be food and beverages?",
    answer:
      "Yes, we will provide refreshments during the event. However, meals will not be provided.",
  },
  {
    question: "Who can participate in the event?",
    answer:
      "The event is open to all students who are currently enrolled in any college or university.",
  },
  {
    question: "What is the deadline for registration?",
    answer:
      "The registration deadline is two days before the event. Make sure to sign up before then!",
  },
  {
    question: "Will the event be held online or offline?",
    answer:
      "The event will be held in-person at the college premises, but we will also offer an online option for some events.",
  },
];

export default function HomePage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b shadow-sm sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-bold text-blue-700">Campus Connect</h1>
        <Link to="/login">
          <button className="text-blue-700 border border-blue-700 px-4 py-1.5 rounded hover:bg-blue-700 hover:text-white transition">
            LOGIN
          </button>
        </Link>
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
          <span
            className="hover:text-blue-700 cursor-pointer"
            onClick={() => setShowFAQModal(true)}
          >
            FAQ
          </span>
          <span className="hidden md:inline">|</span>
          <span
            className="hover:text-blue-700 cursor-pointer"
            onClick={() => setShowContactModal(true)}
          >
            Contact Us
          </span>
          <span className="hidden md:inline">|</span>
          <span
            className="hover:text-blue-700 cursor-pointer"
            onClick={() => setShowAddressModal(true)}
          >
            Address
          </span>
        </div>
      </footer>

      {/* Modal Background */}
      {(showContactModal || showAddressModal || showFAQModal) && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" />
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <Phone size={18} /> Contact Us
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Phone:</strong><br /> +91 44 7111 9111
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Email:</strong><br /> info@citchennai.net
            </p>
            <button
              onClick={() => setShowContactModal(false)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <MapPin size={18} /> Address
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line mb-4">
              Chennai Institute of Technology{"\n"}
              Sarathy Nagar, Kundrathur,{"\n"}
              Chennai-600069, TamilNadu, India.
            </p>
            <button
              onClick={() => setShowAddressModal(false)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* FAQ Modal */}
      {showFAQModal && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <HelpCircle size={22} /> FAQ's
            </h2>
            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border rounded p-3">
                  <button
                    className="w-full text-left font-medium text-black"
                    onClick={() =>
                      setActiveFAQ(activeFAQ === index ? null : index)
                    }
                  >
                    {faq.question}
                  </button>
                  {activeFAQ === index && (
                    <p className="text-gray-600 mt-2 text-sm">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFAQModal(false)}
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

