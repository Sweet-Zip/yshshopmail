"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWallet,
  FaEnvelope,
  FaFacebook,
  FaChevronDown,
  FaInfoCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";

const ServicePurchasePage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const balance = 10000;

  const services = [
    {
      id: "facebook-otp",
      name: "OTP Facebook",
      price: 1100,
      icon: FaFacebook,
      color: "from-blue-500 to-blue-600",
      description: "Receive OTP codes for Facebook verification",
      features: ["Instant delivery", "99% success rate", "24/7 support"],
      estimatedTime: "1-2 minutes",
    },
    // {
    //   id: "gmail-otp",
    //   name: "OTP Gmail",
    //   price: 950,
    //   icon: FaEnvelope,
    //   color: "from-red-500 to-red-600",
    //   description: "Receive OTP codes for Gmail verification",
    //   features: ["Fast delivery", "High success rate", "Reliable service"],
    //   estimatedTime: "30 seconds",
    // },
    // {
    //   id: "instagram-otp",
    //   name: "OTP Instagram",
    //   price: 1200,
    //   icon: FaEnvelope,
    //   color: "from-purple-500 to-pink-500",
    //   description: "Receive OTP codes for Instagram verification",
    //   features: ["Quick setup", "Premium quality", "Instant support"],
    //   estimatedTime: "1 minute",
    // },
  ];

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const canAfford = selectedServiceData
    ? balance >= selectedServiceData.price
    : true;

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsDropdownOpen(false);
  };

  const handlePurchase = async () => {
    if (!selectedService || !canAfford) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle success
    }, 2000);
  };

  const AnimatedNumber = ({ value }: { value: number }) => {
    return (
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {value.toLocaleString()}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen bg-[#15263a] p-6 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl">
              <FaEnvelope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Buy Service</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Purchase verification services for your accounts
          </p>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-3xl p-6 mb-8 shadow-2xl border border-slate-700/50"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl">
                <FaWallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Your Balance</div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedNumber value={balance} />
                  <span className="text-amber-400 ml-2">YSH</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Available</div>
              <div className="text-lg font-semibold text-green-400">Active</div>
            </div>
          </div>
        </motion.div>

        {/* Main Purchase Card */}
        <motion.div
          className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl shadow-2xl border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Service Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-white mb-4">
              Choose Service
            </label>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600/30 rounded-2xl hover:border-amber-400/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <div className="flex items-center gap-3">
                  {selectedServiceData ? (
                    <>
                      <selectedServiceData.icon className="w-5 h-5 text-amber-400" />
                      <span className="text-white font-medium">
                        {selectedServiceData.name}
                      </span>
                      <span className="text-amber-400 font-semibold">
                        {selectedServiceData.price.toLocaleString()} YSH
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-400">Select a service...</span>
                  )}
                </div>
                <FaChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-slate-600/30 rounded-2xl shadow-2xl z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {services.map((service) => (
                      <motion.button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <service.icon className="w-5 h-5 text-amber-400" />
                          <span className="text-white font-medium">
                            {service.name}
                          </span>
                        </div>
                        <span className="text-amber-400 font-semibold">
                          {service.price.toLocaleString()} YSH
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Service Details */}
          <AnimatePresence>
            {selectedServiceData && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${selectedServiceData.color} rounded-2xl`}
                    >
                      <selectedServiceData.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {selectedServiceData.name}
                      </h3>
                      <p className="text-slate-400 mb-4">
                        {selectedServiceData.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-slate-300">
                            Features
                          </h4>
                          {selectedServiceData.features.map(
                            (feature, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <FaCheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-slate-400">
                                  {feature}
                                </span>
                              </div>
                            )
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-slate-400">
                              Estimated time:{" "}
                              {selectedServiceData.estimatedTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaStar className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-slate-400">
                              Premium quality
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaShieldAlt className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-slate-400">
                              Secure & reliable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-600/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Service Price</span>
                      <span className="text-white font-semibold">
                        {selectedServiceData.price.toLocaleString()} YSH
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Your Balance</span>
                      <span className="text-white font-semibold">
                        {balance.toLocaleString()} YSH
                      </span>
                    </div>
                    <div className="h-px bg-slate-600/50 my-3"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">After Purchase</span>
                      <span
                        className={`font-semibold ${
                          canAfford ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {canAfford
                          ? (
                              balance - selectedServiceData.price
                            ).toLocaleString()
                          : "Insufficient Balance"}{" "}
                        YSH
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Purchase Button */}
          <motion.button
            onClick={handlePurchase}
            disabled={!selectedService || !canAfford || isLoading}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
              selectedService && canAfford && !isLoading
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl"
                : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
            }`}
            whileHover={
              selectedService && canAfford && !isLoading ? { scale: 1.02 } : {}
            }
            whileTap={
              selectedService && canAfford && !isLoading ? { scale: 0.98 } : {}
            }
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Purchase...
              </div>
            ) : !selectedService ? (
              "Select a Service"
            ) : !canAfford ? (
              "Insufficient Balance"
            ) : selectedServiceData ? (
              `Buy ${selectedServiceData.name}`
            ) : (
              "Select a Service"
            )}

            {selectedService && canAfford && !isLoading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>

          {/* Security Notice */}
          <motion.div
            className="mt-6 flex items-start gap-3 p-4 bg-slate-800/30 rounded-2xl border border-slate-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <FaInfoCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-slate-400">
              <p className="font-medium text-slate-300 mb-1">
                Purchase Information
              </p>
              <p>
                All services are delivered instantly. Your purchase is protected
                by our guarantee policy.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-3">
              <FaShieldAlt className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Secure</h3>
            </div>
            <p className="text-sm text-slate-400">
              All transactions are encrypted and secure
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Fast</h3>
            </div>
            <p className="text-sm text-slate-400">
              Instant delivery within minutes
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-3">
              <FaStar className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Quality</h3>
            </div>
            <p className="text-sm text-slate-400">
              Premium service with high success rate
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicePurchasePage;
