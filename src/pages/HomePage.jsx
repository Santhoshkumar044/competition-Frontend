import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter";

export default function HomePage() {
  const [stage, setStage] = useState("start");
  const [bounce, setBounce] = useState(false);
  const navigate = useNavigate();
  const circleRef = useRef(null); // ✅ Ref for the final circle

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
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated Shape */}
      {stage !== "showText" && (
        <div
          className={`
            absolute bg-gradient-to-br from-blue-500 to-cyan-400 transition-all duration-1000 ease-in-out
            ${stage === "start" ? "w-40 h-40" : ""}
            ${stage === "rotate" ? "w-40 h-40 rotate-[45deg]" : ""}
            ${stage === "expand" ? "w-[4000px] h-[4000px] rotate-[45deg]" : ""}
            ${stage === "shrinkCircle" ? "w-10 h-10 rounded-full" : ""}
          `}
        ></div>
      )}

      {/* Final State: Text with Circle Beside It */}
      {stage === "showText" && (
        <div className="flex items-center space-x-4 z-10">
          <Typewriter text=" ACAMPUS CONNECT" speed={100} />
          <div
            ref={circleRef} // ✅ Attach ref here
            className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 ${
              bounce ? "animate-bounce" : ""
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}
