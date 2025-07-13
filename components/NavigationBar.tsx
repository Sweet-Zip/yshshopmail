"use client";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { SiUnacademy } from "react-icons/si";
import { HiSun } from "react-icons/hi";

const NavigationBar = () => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <div className="w-full flex justify-center items-center p-5">
      <motion.div
        className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] flex items-center justify-between text-white h-[80px] px-8 rounded-3xl w-full shadow-2xl border border-slate-700/50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.button
          className="p-3 rounded-2xl hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-2xl"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          <BiMenu className="text-2xl relative z-10" />
        </motion.button>

        <div className="flex items-center gap-4">
          <motion.button
            className="relative p-3 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiBell className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-white">3</span>
            </motion.div>
          </motion.button>

          {/* Animated Profile Section */}
          <motion.div
            className="flex items-center gap-4 bg-slate-800/50 rounded-2xl p-2 border border-slate-600/30 hover:border-blue-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500/10 rounded-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: isProfileHovered ? "0%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            <img
              src="https://i.pinimg.com/474x/15/a2/0c/15a20cca57b8829e068e2698bc31966a.jpg"
              alt="Profile"
              className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-500/20 relative z-10"
            />
            <div className="flex flex-col items-start relative z-10">
              <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                YSH Shop Mail
              </span>
              <span className="text-sm text-slate-400">Your one-stop shop</span>
            </div>
            <FiChevronDown className="text-slate-400 relative z-10" />
          </motion.div>
          <HiSun
            size={24}
            className="text-white hover:rotate-90 transition-all duration-300 cursor-pointer"
            onClick={() => alert("Toggle Dark Mode")}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NavigationBar;
