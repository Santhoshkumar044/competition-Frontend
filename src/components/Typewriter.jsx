import { useEffect, useState } from "react";

export default function Typewriter({ text = "", speed = 100 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text || typeof text !== "string") return;

    let i = 0;
    setDisplayed(""); // reset when text changes

    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const nextChar = text.charAt(i);
        console.log("Typing:", nextChar); // Debug line
        return prev + nextChar;
      });
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <h1 className="text-white text-4xl md:text-6xl font-bold">
      {displayed}
      <span className="animate-pulse">|</span>
    </h1>
  );
}
