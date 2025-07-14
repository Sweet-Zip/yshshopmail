"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaCog, FaSearch, FaHome } from "react-icons/fa";
import {
  FaChevronDown,
  FaChevronRight,
  FaClipboardList,
  FaBell,
} from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

type SectionName = "Deposit Money" | "Mail OTP" | "Support";

interface SubMenuItem {
  name: string;
  url: string;
}
const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionName, boolean>
  >({
    "Deposit Money": false,
    "Mail OTP": false,
    Support: false,
  });

  useEffect(() => {
    const section = pathname.split("/")[1];

    const matchingItem = menuItems
      .flatMap((item) => item.subMenu)
      .find((subItem) => {
        const urlPath = subItem.url.startsWith("/")
          ? subItem.url.split("/")[1]
          : null;
        return urlPath === section;
      });

    if (matchingItem) {
      setActiveItem(matchingItem.name);
    } else {
      setActiveItem("Home");
    }
  }, [pathname]);

  const menuItems: Array<{
    name: SectionName;
    icon: React.ComponentType<{ className?: string }>;
    notifications?: number;
    subMenu: SubMenuItem[];
  }> = [
    {
      name: "Deposit Money",
      icon: FaShoppingCart,
      notifications: 3,
      subMenu: [{ name: "Top Up", url: "/topup" }],
    },
    {
      name: "Mail OTP",
      icon: FaClipboardList,
      notifications: 12,
      subMenu: [
        {
          name: "Buy Mail",
          url: "/buy-mail",
        },
        {
          name: "Mail History ",
          url: "/mail-history",
        },
      ],
    },
    {
      name: "Support",
      icon: FaCog,
      subMenu: [
        {
          name: "Telegram",
          url: "https://t.me/kimkuong",
        },
      ],
    },
  ];

  const getItemColors = (itemName: "Home" | SectionName) => {
    const colorMap = {
      Home: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        bgActive: "bg-blue-600/20",
      },
      "Deposit Money": {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        bgActive: "bg-green-600/20",
      },
      "Mail OTP": {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/30",
        bgActive: "bg-orange-600/20",
      },
      Support: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        bgActive: "bg-purple-600/20",
      },
    };
    return colorMap[itemName] ?? colorMap["Home"];
  };

  const toggleSection = (sectionName: SectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] flex flex-col text-white min-h-[calc(100vh-140px)] md:min-w-72 md:max-w-72 min-w-30 max-w-30 transition-all duration-300 rounded-2xl shadow-2xl border border-slate-700/50 fixed">
      <div className="pt-6 px-6 border-slate-600/30">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src="/assets/logo.svg"
              alt="YSH Shop Mail Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg ring-2 ring-slate-500/20"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <FaBell className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="md:text-xl text-center text-sm font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            YSH Shop Mail
          </h1>
          <span className="text-xs text-center md:block hidden text-slate-400">
            Admin Dashboard
          </span>
        </div>
      </div>

      <div className="flex-1 pr-6">
        <div className="flex items-center gap-2 mb-4 ml-2">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Recharge
          </h3>
          <div className="h-px bg-slate-600/30 flex-1"></div>
        </div>
        <div className="mb-6 mt-2">
          <Link href={"/"}>
            <button
              className={`w-full flex items-center gap-4 md:p-4 p-2  transition-all duration-200 relative overflow-hidden rounded-r-full ${
                activeItem === "Home"
                  ? `${getItemColors("Home").bgActive} ${
                      getItemColors("Home").text
                    } border ${getItemColors("Home").border}`
                  : hoveredItem === "Home"
                  ? getItemColors("Home").text
                  : "text-slate-300"
              }`}
              onClick={() => setActiveItem("Home")}
              onMouseEnter={() => setHoveredItem("Home")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                className={`absolute inset-0 ${
                  getItemColors("Home").bg
                } rounded-r-full`}
                initial={{ x: "-100%" }}
                animate={{
                  x: hoveredItem === "Home" ? "0%" : "-100%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 35,
                  mass: 0.8,
                }}
              />

              <FaHome className="w-5 h-5 relative z-10  ml-2" />
              <span className="font-medium relative z-10 md:flex hidden">
                Home
              </span>
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-4 ml-2">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Recharge
          </h3>
          <div className="h-px bg-slate-600/30 flex-1"></div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className={`w-full flex items-center justify-between md:p-4 p-2 transition-all duration-200 relative overflow-hidden rounded-r-full ${
                  activeItem === item.name
                    ? `${getItemColors(item.name).bgActive} ${
                        getItemColors(item.name).text
                      } border ${getItemColors(item.name).border}`
                    : hoveredItem === item.name
                    ? getItemColors(item.name).text
                    : "text-slate-300"
                }`}
                onClick={() => toggleSection(item.name)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className={`absolute inset-0 ${
                    getItemColors(item.name).bg
                  } rounded-r-full`}
                  initial={{ x: "-100%" }}
                  animate={{
                    x: hoveredItem === item.name ? "0%" : "-100%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 35,
                    mass: 0.8,
                  }}
                />

                <div className="flex items-center gap-3 relative z-10 ml-2 ">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium md:flex hidden">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  {item.notifications && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 items-center justify-center md:flex hidden">
                      {item.notifications}
                    </span>
                  )}
                  <motion.div
                    animate={{ rotate: expandedSections[item.name] ? 180 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      mass: 0.8,
                    }}
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedSections[item.name] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, scale: 0.95 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      scale: 1,
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 300,
                          damping: 35,
                          mass: 0.8,
                        },
                        opacity: {
                          duration: 0.2,
                        },
                        scale: {
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      scale: 0.95,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                    className="ml-5 mt-2 overflow-hidden"
                  >
                    <div className="space-y-1">
                      {item.subMenu.map((subItem, subIndex) => {
                        const isExternal = subItem.name === "Telegram";
                        const baseClassName = `w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          !isExternal && subItem.name === activeItem
                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                            : "hover:bg-slate-700/30 text-slate-400"
                        }`;

                        const buttonContent = (
                          <span className="text-sm font-medium">
                            {subItem.name}
                          </span>
                        );

                        if (isExternal) {
                          return (
                            <a
                              key={subIndex}
                              href={subItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.button
                                className={baseClassName}
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  transition: {
                                    delay: subIndex * 0.1,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 35,
                                  },
                                }}
                                onClick={() => setActiveItem(subItem.name)}
                              >
                                {subItem.name}
                              </motion.button>
                            </a>
                          );
                        }

                        return (
                          <Link href={subItem.url} key={subIndex}>
                            <motion.button
                              className={baseClassName}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: {
                                  delay: subIndex * 0.1,
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 35,
                                },
                              }}
                              onClick={() => setActiveItem(subItem.name)}
                            >
                              {buttonContent}
                            </motion.button>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 border-t border-slate-600/30 mt-auto">
        <div className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-slate-800/50 rounded-2xl border border-slate-600/30 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src="https://i.pinimg.com/474x/15/a2/0c/15a20cca57b8829e068e2698bc31966a.jpg"
              alt="profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover ring-2 ring-slate-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
          </div>
          <div className="flex-1 min-w-0 md:block hidden">
            <p className="font-semibold text-white text-sm sm:text-base truncate ">
              John Doe
            </p>
            <p className="text-xs sm:text-sm text-slate-400">Administrator</p>
          </div>
          <Link href="/login" className="hover:cursor-pointer md:block hidden">
            <button className="text-slate-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg flex-shrink-0">
              <LuLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>

        <div className="text-center text-xs text-slate-500 px-2">
          © 2024 YSH Shop Mail. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SideBar;
