import React from "react";
import { useState } from "react";
import { FcGoogle } from 'react-icons/fc'; // Put this at the top of your file

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-blue-100">
          <img
            src="/illustration.png"
            alt="Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          {/* Social Sign In */}
          <div className="flex justify-center mb-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            <FcGoogle size={20} />
            <span className="text-sm text-gray-700">Sign in with Google</span>
             </button>
          </div>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Remember Me</span>
              </label>
              {isLogin && (
                <a href="#" className="text-sm text-blue-600">
                  Forgot Password?
                </a>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-red-600 ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
