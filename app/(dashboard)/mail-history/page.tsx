"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaSearch,
  FaFilter,
  FaEllipsisV,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaCheck,
  FaCopy,
  FaTrash,
  FaEye,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const MailHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const itemsPerPage = 10;

  // Sample data - replace with your actual data
  const mailHistory = [
    {
      id: 1,
      email: "walshannika51550@gmail.com",
      service: "facebook",
      idKey: "PfiLzJjSAaLnE8jO",
      otp: "loading",
      status: "pending",
      createdAt: "2025-01-14 10:30:00",
      expiresAt: "2025-01-14 10:35:00",
    },
    {
      id: 2,
      email: "johndoe123@gmail.com",
      service: "gmail",
      idKey: "XmKpQwErTyUiOp",
      otp: "123456",
      status: "completed",
      createdAt: "2025-01-14 10:25:00",
      expiresAt: "2025-01-14 10:30:00",
    },
    {
      id: 3,
      email: "socialmedia@yahoo.com",
      service: "instagram",
      idKey: "AsDfGhJkLmNb",
      otp: "expired",
      status: "expired",
      createdAt: "2025-01-14 10:20:00",
      expiresAt: "2025-01-14 10:25:00",
    },
    {
      id: 4,
      email: "testuser@hotmail.com",
      service: "facebook",
      idKey: "QwErTyUiOpAs",
      otp: "789012",
      status: "completed",
      createdAt: "2025-01-14 10:15:00",
      expiresAt: "2025-01-14 10:20:00",
    },
    {
      id: 5,
      email: "verification@gmail.com",
      service: "gmail",
      idKey: "ZxCvBnMlKjHg",
      otp: "345678",
      status: "completed",
      createdAt: "2025-01-14 10:10:00",
      expiresAt: "2025-01-14 10:15:00",
    },
  ];

  const services = [
    {
      id: "all",
      name: "All Services",
      icon: FaEnvelope,
      color: "text-slate-400",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: FaFacebook,
      color: "text-blue-500",
    },
    { id: "gmail", name: "Gmail", icon: FaGoogle, color: "text-red-500" },
    {
      id: "instagram",
      name: "Instagram",
      icon: FaInstagram,
      color: "text-pink-500",
    },
  ];

  const getServiceIcon = (service: string) => {
    const serviceData = services.find((s) => s.id === service);
    return serviceData ? serviceData.icon : FaEnvelope;
  };

  const getServiceColor = (service: string) => {
    const serviceData = services.find((s) => s.id === service);
    return serviceData ? serviceData.color : "text-slate-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const filteredHistory = mailHistory.filter((item) => {
    const matchesSearch =
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.idKey.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService =
      selectedService === "all" || item.service === selectedService;
    return matchesSearch && matchesService;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCopyOTP = (otp: string) => {
    if (otp !== "loading" && otp !== "expired") {
      navigator.clipboard.writeText(otp);
    }
  };

  const handleCopyIdKey = (idKey: string) => {
    navigator.clipboard.writeText(idKey);
  };

  type MailHistoryItem = {
    id: number;
    email: string;
    service: string;
    idKey: string;
    otp: string;
    status: string;
    createdAt: string;
    expiresAt: string;
  };

  const ActionMenu = ({ item }: { item: MailHistoryItem }) => {
    const isOpen = openMenuId === item.id;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenMenuId(isOpen ? null : item.id)}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
        >
          <FaEllipsisV className="w-4 h-4 text-slate-400" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop for mobile */}
              <div
                className="fixed inset-0 z-10 md:hidden"
                onClick={() => setOpenMenuId(null)}
              />

              <motion.div
                className="absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-2xl z-20"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      handleCopyOTP(item.otp);
                      setOpenMenuId(null);
                    }}
                    disabled={item.otp === "loading" || item.otp === "expired"}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700/50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCopy className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">Copy OTP</span>
                  </button>

                  <button
                    onClick={() => {
                      handleCopyIdKey(item.idKey);
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  >
                    <FaCopy className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-300">Copy ID Key</span>
                  </button>

                  <button
                    onClick={() => setOpenMenuId(null)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  >
                    <FaEye className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-slate-300">View Details</span>
                  </button>

                  <div className="h-px bg-slate-600/30 my-2"></div>

                  <button
                    onClick={() => setOpenMenuId(null)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  >
                    <FaTrash className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-slate-300">Delete</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const LoadingOTP = () => (
    <div className="flex items-center gap-2">
      <FaSpinner className="w-4 h-4 text-yellow-400 animate-spin" />
      <span className="text-yellow-400 text-xs sm:text-sm">Loading...</span>
    </div>
  );

  const OTPDisplay = ({ item }: { item: MailHistoryItem }) => {
    if (item.otp === "loading") return <LoadingOTP />;
    if (item.otp === "expired")
      return <span className="text-red-400 text-xs sm:text-sm">Expired</span>;

    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-green-400 font-semibold text-xs sm:text-sm">
          {item.otp}
        </span>
        <button
          onClick={() => handleCopyOTP(item.otp)}
          className="p-1 hover:bg-slate-700/50 rounded transition-colors duration-200"
        >
          <FaCopy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
        </button>
      </div>
    );
  };

  const MobileCard = ({
    item,
    index,
  }: {
    item: MailHistoryItem;
    index: number;
  }) => {
    const ServiceIcon = getServiceIcon(item.service);

    return (
      <motion.div
        className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:bg-slate-800/50 transition-colors duration-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
              <ServiceIcon
                className={`w-4 h-4 sm:w-5 sm:h-5 ${getServiceColor(
                  item.service
                )}`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white font-medium text-sm truncate">
                {item.email}
              </div>
              <div className="text-xs text-slate-400 capitalize">
                {item.service}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                item.status
              )}`}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
            <ActionMenu item={item} />
          </div>
        </div>

        {/* Content Rows */}
        <div className="space-y-2">
          {/* ID Key Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex-shrink-0">
              ID Key:
            </span>
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-slate-300 text-xs truncate">
                {item.idKey}
              </span>
              <button
                onClick={() => handleCopyIdKey(item.idKey)}
                className="p-1 hover:bg-slate-700/50 rounded transition-colors duration-200 flex-shrink-0"
              >
                <FaCopy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
              </button>
            </div>
          </div>

          {/* OTP Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex-shrink-0">OTP:</span>
            <OTPDisplay item={item} />
          </div>

          {/* Date Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex-shrink-0">
              Created:
            </span>
            <span className="text-xs text-slate-300">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#15263a] py-3">
      <div className="px-2 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl">
              <FaEnvelope className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">
              Mail History
            </h1>
          </div>
          <p className="text-slate-400 text-sm sm:text-lg">
            View and manage your email verification history
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-2xl border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by email or ID key..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-sm sm:text-base"
              />
            </div>

            {/* Service Filter */}
            <div className="relative">
              <select
                aria-label="Filter by service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base w-full sm:w-auto min-w-[140px]"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* History Table/Cards */}
        <motion.div
          className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Mobile Cards - Visible on Mobile and Tablet */}
          <div className="block xl:hidden p-3 sm:p-6">
            <AnimatePresence>
              <div className="space-y-3 sm:space-y-4">
                {currentItems.map((item, index) => (
                  <MobileCard
                    key={`mobile-${item.id || index}-${item.email}`}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Desktop Table - Only on Large Screens */}
          <div className="hidden xl:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700/50">
                    <th className="text-left px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[200px]">
                      Email
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[120px]">
                      Service
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[150px]">
                      ID Key
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[120px]">
                      OTP
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[100px]">
                      Status
                    </th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wide min-w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence>
                    {currentItems.map((item, index) => {
                      const ServiceIcon = getServiceIcon(item.service);

                      return (
                        <motion.tr
                          key={`desktop-${item.id || index}-${item.email}`}
                          className="border-b border-slate-700/30 last:border-b-0 hover:bg-slate-800/20 transition-colors duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          {/* Email Column */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaEnvelope className="w-4 h-4 text-slate-400" />
                              </div>
                              <div className="min-w-0 max-w-[180px]">
                                <div className="text-white font-medium truncate">
                                  {item.email}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Service Column */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <ServiceIcon
                                className={`w-5 h-5 ${getServiceColor(
                                  item.service
                                )}`}
                              />
                              <span className="text-slate-300 capitalize">
                                {item.service}
                              </span>
                            </div>
                          </td>

                          {/* ID Key Column */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-slate-300 text-sm max-w-[120px] truncate">
                                {item.idKey}
                              </span>
                              <button
                                title="Copy ID Key"
                                onClick={() => handleCopyIdKey(item.idKey)}
                                className="p-1 hover:bg-slate-700/50 rounded transition-colors duration-200 flex-shrink-0"
                              >
                                <FaCopy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
                              </button>
                            </div>
                          </td>

                          {/* OTP Column */}
                          <td className="px-4 py-4">
                            <OTPDisplay item={item} />
                          </td>

                          {/* Status Column */}
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                item.status
                              )} whitespace-nowrap`}
                            >
                              {item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)}
                            </span>
                          </td>

                          {/* Actions Column */}
                          <td className="px-4 py-4 text-center">
                            <ActionMenu item={item} />
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* No Results */}
          {currentItems.length === 0 && (
            <div className="text-center py-12 px-6">
              <div className="text-slate-400 text-base sm:text-lg mb-2">
                No mail history found
              </div>
              <div className="text-slate-500 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-slate-800/50 px-3 sm:px-6 py-4 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
                  <span className="hidden sm:inline">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredHistory.length
                    )}{" "}
                    of {filteredHistory.length} entries
                  </span>
                  <span className="sm:hidden">
                    {filteredHistory.length} total entries
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    title="Previous Page"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <FaChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    title="Next Page"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <FaChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="text-green-400 font-semibold text-sm sm:text-base">
                Completed
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {mailHistory.filter((item) => item.status === "completed").length}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <FaSpinner className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm sm:text-base">
                Pending
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {mailHistory.filter((item) => item.status === "pending").length}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <FaTrash className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm sm:text-base">
                Expired
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {mailHistory.filter((item) => item.status === "expired").length}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm sm:text-base">
                Total
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {mailHistory.length}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MailHistoryPage;
