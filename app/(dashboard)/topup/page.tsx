"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaDollarSign,
  FaQrcode,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import useAnimatedNumber from "@/app/util/useAnimatedNumber ";
import KHQRComponent from "@/components/KHQRComponent";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false); // Add state for QR display

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");

    if (value === "" || value === ".") {
      setAmount(value);
      setSelectedAmount(null);
      return;
    }

    const numValue = parseFloat(value);
    if (numValue < 10000) {
      setAmount(value);
      setSelectedAmount(null);
    } else {
      setAmount("10000");
      setSelectedAmount(null);
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
    setSelectedAmount(quickAmount);
  };

  const handleTopUp = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);
    setIsLoading(false);
    setShowQR(true);
  };

  const yshAmount = amount
    ? (parseFloat(amount) * 24000).toLocaleString()
    : "0";
  const isValidAmount = amount && parseFloat(amount) > 0;

  const AnimatedNumber = ({
    value,
    duration = 800,
    decimals = 0,
    prefix = "",
    suffix = "",
  }: {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }) => {
    const animatedValue = useAnimatedNumber(value || 0, duration);

    const formatNumber = (num: number) => {
      if (decimals === 0) {
        return Math.round(num).toLocaleString();
      }
      return num.toFixed(decimals);
    };

    return (
      <span>
        {prefix}
        {formatNumber(animatedValue)}
        {suffix}
      </span>
    );
  };

  if (showQR) {
    return (
      <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 w-full ">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl">
                <FaQrcode className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Scan to Pay
              </h1>
            </div>
            <p className="text-slate-400 text-lg">
              Scan the QR code below to complete your payment
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl shadow-2xl border border-slate-700/50 p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="text-2xl font-bold text-amber-400 mb-2">
                ${parseFloat(amount).toFixed(2)} USD
              </div>
              <div className="text-slate-400">
                You'll receive{" "}
                <span className="text-blue-400 font-semibold">
                  {yshAmount} YSH
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-[#16263A] to-[#1B2738] p-4 rounded-2xl">
                <KHQRComponent amount={parseFloat(amount)} />
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowQR(false)}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors duration-300"
              >
                Back to Amount Selection
              </button>

              <div className="text-sm text-slate-400">
                Payment will be automatically detected once completed
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 w-full">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl sm:rounded-2xl">
              <FaWallet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Top Up
            </h1>
          </div>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg px-4 sm:px-0">
            Add funds to your YSH Shop Mail account
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Payment Method Info */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl border border-slate-600/30">
              <img
                src="/assets/khqr.png"
                alt="KHQR"
                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400"
              />
              <span className="text-white font-medium text-sm sm:text-base">
                KHQR Payment
              </span>
            </div>
          </div>

          {/* Exchange Rate Info */}
          <motion.div
            className="bg-slate-800/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 border border-slate-600/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Exchange Rate
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400">
                  1 USD
                </div>
                <div className="text-xs sm:text-sm text-slate-400">
                  US Dollar
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">
                  24,000 YSH
                </div>
                <div className="text-xs sm:text-sm text-slate-400">
                  Shop Credits
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Select */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Select
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {quickAmounts.map((quickAmount) => (
                <motion.button
                  key={quickAmount}
                  onClick={() => handleQuickAmount(quickAmount)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base min-h-[44px] ${
                    selectedAmount === quickAmount
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ${quickAmount}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Enter Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="0.00"
                className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 bg-slate-800/50 border border-slate-600/30 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 text-base sm:text-lg min-h-[48px] sm:min-h-[52px]"
              />

              {isValidAmount && (
                <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
              )}
            </div>
          </div>

          {/* Conversion Display */}
          {amount && (
            <motion.div
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-500/20"
              initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs sm:text-sm text-slate-400">
                    You'll receive
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    <AnimatedNumber value={parseFloat(amount) * 24000} />
                    <span className="text-blue-400 ml-1">YSH</span>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs sm:text-sm text-slate-400">
                    You pay
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-400">
                    $<AnimatedNumber value={parseFloat(amount)} />
                    <span className="text-slate-400 ml-1">USD</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.button
            onClick={handleTopUp}
            disabled={!isValidAmount || isLoading}
            className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 relative overflow-hidden min-h-[48px] sm:min-h-[56px] ${
              isValidAmount && !isLoading
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 shadow-lg hover:shadow-xl"
                : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
            }`}
            whileHover={isValidAmount && !isLoading ? { scale: 1.01 } : {}}
            whileTap={isValidAmount && !isLoading ? { scale: 0.99 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm sm:text-base">Processing...</span>
              </div>
            ) : (
              <span>Top Up Now</span>
            )}

            {isValidAmount && !isLoading && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>

          <motion.div
            className="mt-4 sm:mt-6 flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-800/30 rounded-xl sm:rounded-2xl border border-slate-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-slate-400">
              <p className="font-medium text-slate-300 mb-1">Security Notice</p>
              <p>
                All transactions are secured with end-to-end encryption. Your
                payment information is never stored on our servers.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
              Transaction Limits
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>• Minimum: $1 USD</li>
              <li>• Maximum: $1,000 USD per transaction</li>
              <li>• Daily limit: $5,000 USD</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
              Processing Time
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>• KHQR: Instant</li>
              <li>• Bank Transfer: 1-3 business days</li>
              <li>• International: 3-5 business days</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TopUpPage;
