"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#15263a] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        <div className="flex min-h-[600px]">
          {/* Left Side - Login Form */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                YSH Shop Mail
              </h1>
              <div className="flex gap-4 sm:gap-6">
                <button
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isLogin ? "text-white" : "text-slate-400"
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  Log in
                </button>
                <Link
                  href={"/register"}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    !isLogin ? "text-white" : "text-slate-400"
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>

            <motion.form
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="e-mail address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-sm sm:text-base"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-sm sm:text-base"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
                  ) : (
                    <FaEye className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                >
                  I forgot
                </button>
              </div>

              {/* Login Button */}
              <Link href={"/"}>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:cursor-pointer text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                  <span className="relative z-10">Log in</span>
                </motion.button>
              </Link>
            </motion.form>

            {/* Warning Text */}
            <div className="mt-6 sm:mt-8 text-xs text-slate-500 leading-relaxed">
              For use by adults only (18 years of age and older). Keep out of
              reach of children and pets. In case of accidental ingestion
              contact poison control immediately.
            </div>

            {/* New Features Section */}
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-300">
                  New Features
                </h3>
                <span className="text-xs text-slate-500">Admin Panel</span>
              </div>

              <motion.button
                className="w-full bg-slate-700 text-white py-3 rounded-xl sm:rounded-2xl font-medium hover:bg-slate-600 transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover
              </motion.button>
            </div>

            {/* Social Login */}
            <div className="mt-6 sm:mt-8 space-y-3">
              <div className="text-center text-xs text-slate-500 mb-4">
                Or continue with
              </div>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg sm:rounded-xl transition-colors duration-200 border border-slate-600/30">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                    className="w-6 h-6"
                  />
                  <span className="text-xs sm:text-sm text-slate-300">
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Preview (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-12 flex-col justify-center items-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
            </div>

            {/* Main Card */}
            <motion.div
              className="bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-700/50 w-full max-w-sm relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">Mon</span>
                  <span className="text-slate-400 text-lg">14th</span>
                </div>
                <div className="text-slate-300 text-lg font-medium">
                  12:15 AM
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  Jakarta, Indonesia
                </div>
              </div>

              {/* Event Info */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  System Launch
                </h3>
                <p className="text-slate-400 text-sm">
                  New YSH Shop Mail Platform
                </p>
              </div>

              {/* Gradient Circle */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Bottom Section */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-300">
                    YSH Shop
                  </span>
                </div>
                <Link href={"/register"}>
                  <motion.button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join in
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-1/4 left-8 w-3 h-3 bg-blue-400/30 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/3 right-12 w-2 h-2 bg-blue-300/40 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
