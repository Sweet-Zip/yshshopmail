"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaGoogle,
  FaApple,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  return (
    <div className="min-h-screen bg-[#15263a] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl bg-[#1e293b]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[700px]">
          {/* Left Side - Registration Form */}
          <div className="flex-1 p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                YSH Shop Mail
              </h1>
              <div className="flex gap-4 sm:gap-6">
                <Link
                  href={"/login"}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
                >
                  Log in
                </Link>
                <button className="text-sm font-medium text-white transition-colors duration-200">
                  Sign up
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <motion.form
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaUser className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-sm sm:text-base"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
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
                  placeholder="Password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-400">
                      Password Strength
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        passwordStrength <= 2
                          ? "text-red-400"
                          : passwordStrength <= 3
                          ? "text-yellow-400"
                          : passwordStrength <= 4
                          ? "text-blue-400"
                          : "text-green-400"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 sm:pl-12 pr-12 sm:pr-16 py-3 sm:py-4 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-sm sm:text-base"
                />
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3 sm:pr-4">
                  {formData.confirmPassword && (
                    <div className="flex items-center">
                      {passwordsMatch ? (
                        <FaCheck className="h-4 w-4 text-green-400" />
                      ) : (
                        <FaTimes className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
                    ) : (
                      <FaEye className="h-4 w-4 text-slate-400 hover:text-slate-300 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800 flex-shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                >
                  I agree to the{" "}
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </button>
                </label>
              </div>

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
                  <span className="relative z-10">Create Account</span>
                </motion.button>
              </Link>
            </motion.form>

            {/* Already have account */}
            <div className="mt-4 sm:mt-6 text-center">
              <span className="text-slate-400 text-xs sm:text-sm">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors text-xs sm:text-sm font-medium"
              >
                Sign in
              </Link>
            </div>

            {/* Social Registration */}
            <div className="mt-6 sm:mt-8 space-y-3">
              <div className="text-center text-xs text-slate-500 mb-4">
                Or sign up with
              </div>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg sm:rounded-xl transition-colors duration-200 border border-slate-600/30">
                  <FaGoogle className="w-4 h-4 text-red-400" />
                  <span className="text-xs sm:text-sm text-slate-300">
                    Google
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg sm:rounded-xl transition-colors duration-200 border border-slate-600/30">
                  <FaApple className="w-4 h-4 text-slate-300" />
                  <span className="text-xs sm:text-sm text-slate-300">
                    Apple
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Welcome Card */}
          <div className="flex-1 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden order-1 lg:order-2 min-h-[300px] lg:min-h-0">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-16 sm:w-32 h-16 sm:h-32 bg-green-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-12 sm:w-24 h-12 sm:h-24 bg-green-300 rounded-full blur-2xl"></div>
            </div>

            {/* Main Welcome Card */}
            <motion.div
              className="bg-slate-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/50 w-full max-w-sm relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Welcome Header */}
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Welcome!
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Join our community today
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Secure & Encrypted
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    24/7 Support
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Easy Integration
                  </span>
                </motion.div>
              </div>

              {/* Animated Circle */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FaUser className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    10k+
                  </div>
                  <div className="text-xs text-slate-400">Users</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    99.9%
                  </div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-1/4 left-4 sm:left-8 w-2 sm:w-3 h-2 sm:h-3 bg-green-400/30 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/3 right-6 sm:right-12 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300/40 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
