import { useEffect, useState } from "react";

export default function Typewriter({ text = "", speed = 100 }) {
  const [displayed, setDisplayed] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text || typeof text !== "string") return;

    // Reset when text changes
    setDisplayed("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(prev => prev + text.charAt(currentIndex));
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed]);

  return (
    <h1 className="text-white text-4xl md:text-6xl font-bold">
      {displayed}
      <span className="animate-pulse">|</span>
    </h1>
  );
}