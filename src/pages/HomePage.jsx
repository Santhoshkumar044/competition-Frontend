import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";

export default function HomePage() {
  const [stage, setStage] = useState("start");
  const [bounce, setBounce] = useState(false);
  const navigate = useNavigate();
  const circleRef = useRef(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage("rotate"), 1000),
      setTimeout(() => setStage("expand"), 2000),
      setTimeout(() => setStage("shrinkCircle"), 3000),
      setTimeout(() => setStage("showText"), 4000),
      setTimeout(() => setBounce(true), 5000),
      setTimeout(() => {
        if (circleRef.current) {
          const rect = circleRef.current.getBoundingClientRect();
          localStorage.setItem(
            "circlePos",
            JSON.stringify({ top: rect.top, left: rect.left })
          );
        }
        navigate("/home");
      }, 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Shape */}
      {stage !== "showText" && (
        <div
          className={`
            absolute bg-gradient-to-br from-blue-500 to-cyan-400 transition-all duration-1000 ease-in-out
            ${stage === "start" ? "w-20 h-20 sm:w-32 sm:h-32" : ""}
            ${stage === "rotate" ? "w-20 h-20 sm:w-32 sm:h-32 rotate-[45deg]" : ""}
            ${stage === "expand" ? "w-[2000px] h-[2000px] sm:w-[4000px] sm:h-[4000px] rotate-[45deg]" : ""}
            ${stage === "shrinkCircle" ? "w-6 h-6 sm:w-10 sm:h-10 rounded-full" : ""}
          `}
        ></div>
      )}

      {/* Final State: Text with Circle */}
      {stage === "showText" && (
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 z-10 space-y-4 sm:space-y-0">
          <Typewriter text="CAMPUS CONNECT" speed={100} />
          <div
            ref={circleRef}
            className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 ${
              bounce ? "animate-bounce" : ""
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}
// import React from 'react';
// import ThreeDMonitor from './ThreeDMonitor'; // adjust path as needed

// export default function Homepage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-4xl font-bold mb-6">Enter the Arena</h1>
//       <div className="w-[400px] h-[400px]">
//         <ThreeDMonitor />
//       </div>
//       <p className="mt-4 text-gray-400 text-sm tracking-wide">Gaming mode: ON 🎮</p>
//     </div>
//   );
// }
