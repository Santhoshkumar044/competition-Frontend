import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt,FaChevronLeft, FaChevronRight } from "react-icons/fa";

const _motion = motion;
const RecommendationCarousel = React.memo(({ 
  recommendedCompetitions, 
  user, 
  handleConfirmClick, 
  markAsViewed 
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredRecommended, setHoveredRecommended] = useState(false);
  const scrollref = useRef(null);

  // Auto-slide every 5 seconds when not hovered
  useEffect(() => {
    if (hoveredRecommended) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) =>
        prev === Math.min(recommendedCompetitions.length, 6) - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [hoveredRecommended, recommendedCompetitions.length]);

  if (recommendedCompetitions.length === 0) return null;

  return (
    <section className="relative z-10 px-0 py-8 bg-white bg-opacity-60 backdrop-blur-md mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#4B3F72] mb-2 text-center">
        Recommended For You
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Based on your interest in {user?.domain || "your field"}
      </p>
      <div className="text-sm text-center text-[#4B3F72] bg-[#E3DFFF] bg-opacity-30 px-3 py-1 rounded-full w-fit mx-auto mb-6">
        {recommendedCompetitions.length} suggestions
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollref}
          onMouseEnter={() => setHoveredRecommended(true)}
          onMouseLeave={() => setHoveredRecommended(false)}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {recommendedCompetitions.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="w-full flex-shrink-0 px-4 sm:px-16 md:px-28 lg:px-40"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-[#E3DFFF] shadow-md rounded-xl p-6 h-60 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="text-lg font-bold text-[#4B3F72]">{item.title}</div>
                <div className="text-sm text-gray-600">
                  📍 {item.organiser?.trim() === item.location?.trim() ? "Online" : item.location}
                </div>
                <div className="text-sm text-gray-600">🧑‍💼 {item.organiser || "Unknown Organiser"}</div>
                <div className="text-sm text-gray-600">🏆 {item.prize || "N/A"}</div>
                <div className="text-sm text-gray-600">⏳ {item.daysLeft}</div>
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      if (user?.email) {
                        await markAsViewed(user.email, item._id);
                      }
                      window.open(item.link, "_blank");
                    }}
                    className="px-3 py-1.5 text-sm bg-[#E3DFFF] text-[#4B3F72] rounded-md hover:bg-[#d5d0f0] transition"
                  >
                    <FaExternalLinkAlt className="inline mr-1" />
                    View
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConfirmClick(item._id)}
                    className="px-3 py-1.5 text-sm bg-[#FFF4E0] text-[#D4A017] rounded-md hover:bg-[#f8e3a0] transition"
                  >
                    Confirm
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

       {/* Arrow Navigation */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => (prev === 0 ? recommendedCompetitions.length - 1 : prev - 1))}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition"
          >
            <FaChevronLeft className="text-[#4B3F72]" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev === recommendedCompetitions.length - 1 ? 0 : prev + 1
              )
            }
            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition"
          >
            <FaChevronRight className="text-[#4B3F72]" />
          </button>
        </div>
      </div>
    </section>
  );
});

export default RecommendationCarousel;
