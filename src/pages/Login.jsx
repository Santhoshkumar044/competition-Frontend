
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-['Outfit'] px-4 py-8 sm:p-0">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-2 sm:mb-3 md:mb-4 text-center">
        Campus Connect
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-5 md:mb-6 text-center">
        Chennai Institute of Technology
      </p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 bg-black text-white px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full hover:scale-105 transition-transform text-sm sm:text-base md:text-lg"
      >
        <FcGoogle className="text-lg sm:text-xl md:text-2xl" />
        Sign in with Google
      </button>
    </div>
  );
}