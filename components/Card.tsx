import React from "react";
import { MdAccountBalanceWallet } from "react-icons/md";

interface CardProps {
  balance: string;
  usagePercent: number;
  title: string;
}
const Card = ({ balance, usagePercent, title }: CardProps) => {
  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-2xl w-full h-40 flex flex-col justify-between shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-700/50 hover:border-yellow-400/30 group">
      <div className="flex justify-between items-start">
        <div className="relative">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center w-16 h-16 group-hover:scale-110">
            <MdAccountBalanceWallet
              className="text-yellow-900 drop-shadow-sm"
              size={28}
            />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="flex items-baseline gap-1 mb-1">
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
              {balance}
            </h2>
            <span className="text-sm text-yellow-400 font-medium uppercase tracking-wide">
              YSH
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Usage</span>
          <span className="text-xs text-slate-400">{usagePercent}%</span>
        </div>
        <div className="bg-slate-700/50 w-full h-2 relative rounded-full overflow-hidden">
          <div
            className={`bg-gradient-to-r from-yellow-400 to-yellow-500 h-2  rounded-full transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
