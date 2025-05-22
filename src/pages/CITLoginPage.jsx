import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";

export default function CITLoginPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = "http://localhost:5000/auth/google";
    }
  }, [shouldRedirect]);  //dependency might be changed

  const handleGoogleSignIn = () => {
    setShouldRedirect(true);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">Chennai Institute of Technology</h1>
      <p className="text-lg text-gray-400 text-center mb-10 max-w-xl">
        Creating opportunities – a competition dashboard for CIT students
      </p>

      <button
        onClick={handleGoogleSignIn}
        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-medium">Sign In With Google</span>
        <FaArrowRight className="ml-2 text-sm" />
      </button>
    </div>
  );
}
