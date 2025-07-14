"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaHeart, FaTelegramPlane } from "react-icons/fa";

const CuteFooter = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Spring configuration for smooth animations
  const springConfig = { stiffness: 100, damping: 5 };

  // Motion values for mouse tracking and wiggle effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotate the tooltip based on mouse movement
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    springConfig
  );

  // Translate the tooltip based on mouse movement
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(y, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = event.clientX - rect.left - centerX;
    const mouseY = event.clientY - rect.top - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  const developerProfile = {
    name: "KimKuong",
    designation: "Full Stack Developer",
    // image:
    //   "https://i.pinimg.com/474x/15/a2/0c/15a20cca57b8829e068e2698bc31966a.jpg",
    image:
      "https://i.pinimg.com/736x/07/45/e3/0745e3d17447824aa18035d3fe93211d.jpg",
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-2xl border border-white/20 text-white text-center relative hover:shadow-pink-500/20 transition-all duration-300"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Background sparkles */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute top-2 right-3 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-yellow-300 rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-pink-200 rounded-full"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center gap-2 text-xs sm:text-sm">
          <span className="font-medium">Crafted with</span>

          {/* Animated heart */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaHeart className="text-red-400 w-4 h-4 drop-shadow-sm" />
          </motion.div>

          <span className="font-medium">by</span>

          {/* Developer link */}
          <a
            href="https://t.me/kimkuong"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg transition-all duration-200 hover:shadow-lg relative"
          >
            <FaTelegramPlane className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200" />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              KimKuong
            </span>
          </a>
        </div>

        {/* Animated Tooltip with Mouse Following and Wiggle */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                translateY: translateY,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-28 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-lg px-4 py-3 shadow-2xl border border-white/20 pointer-events-none"
            >
              {/* Gradient borders */}
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              {/* Profile image */}
              <div className="relative mb-2">
                <img
                  src={developerProfile.image}
                  alt={developerProfile.name}
                  className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Profile info */}
              <div className="text-center">
                <div className="text-sm font-bold text-white mb-1">
                  {developerProfile.name}
                </div>
                <div className="text-xs text-slate-300">
                  {developerProfile.designation}
                </div>
              </div>

              {/* Cute sparkles around tooltip */}
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">
                ✨
              </div>
              <div className="absolute -bottom-2 -left-2 text-pink-400 animate-bounce">
                💖
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating hearts */}
        <motion.div
          className="absolute -top-2 -right-1 text-pink-300 pointer-events-none"
          animate={{
            y: [0, -8, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -left-1 text-purple-300 pointer-events-none"
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CuteFooter;
