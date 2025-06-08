import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white font-['Outfit']">
      <h1 className="text-4xl font-bold text-black mb-2">Campus Connect</h1>
      <p className="text-lg text-gray-700 mb-6">Chennai Institute of Technology</p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
      >
        <FcGoogle className="text-xl" />
        Sign in with Google
      </button>
    </div>
  );
}
