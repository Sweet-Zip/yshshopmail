"use client";
import React, { use, useEffect, useState } from "react";
import { COUNTRY, CURRENCY, KHQR, TAG } from "ts-khqr";
import QRCode from "qrcode";

interface KHQRProps {
  amount: number;
  onPaymentSuccess?: (paymentMethod: string, amount: number) => void;
  onClose?: () => void;
}

const KHQRComponent = ({ amount, onPaymentSuccess, onClose }: KHQRProps) => {
  const token = process.env.NEXT_PUBLIC_BAKONG_TOKEN;
  const baseUrl = "https://api-bakong.nbc.gov.kh"; // or use your environment variable

  const [qrImage, setQrImage] = useState("");
  const [qrDataString, setQrDataString] = useState(""); // Store the raw QR string
  const [md5Checksum, setMd5Checksum] = useState("");
  const [deeplink, setDeeplink] = useState("");
  const [statusMessage, setStatusMessage] = useState("Waiting for payment...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingDeeplink, setIsGeneratingDeeplink] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const generateQR = async () => {
    if (!amount || amount <= 0) {
      console.error("Invalid amount for QR generation");
      return;
    }

    setIsGenerating(true);
    try {
      const roundedAmount = Math.round((amount ?? 0) * 100) / 100;

      console.log("Generating QR for amount:", amount);
      const qrData = KHQR.generate({
        tag: TAG.INDIVIDUAL,
        accountID: "kuong_sreng@trmc",
        merchantName: "YSNMail",
        merchantCity: "Phnom Penh",
        currency: CURRENCY.USD,
        amount: roundedAmount,
        countryCode: COUNTRY.KH,
      });

      if (!qrData || !qrData.data?.qr) {
        throw new Error("QR data is empty or invalid.");
      }

      console.log("QR Data generated:", qrData);
      const qrUrl = await QRCode.toDataURL(qrData.data?.qr);
      setQrImage(qrUrl);
      setQrDataString(qrData.data?.qr); // Store the raw QR string for deeplink
      setMd5Checksum(qrData.data.md5);
      setStatusMessage("QR Code generated successfully. Scan to pay.");

      // Generate deeplink after QR is created
      generateDeeplink(qrData.data?.qr);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setStatusMessage("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDeeplink = async (qrString: string) => {
    if (!qrString || !token) {
      console.error("Missing QR string or token for deeplink generation");
      return;
    }

    setIsGeneratingDeeplink(true);
    try {
      const response = await fetch(`${baseUrl}/v1/generate_deeplink_by_qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qr: qrString,
          sourceInfo: {
            appIconUrl: "https://bakong.nbc.org.kh/images/logo.svg", // Replace with your app icon URL
            appName: "Bakong",
            appDeepLinkCallback: "https://bakong.nbc.org.kh/",
          },
        }),
      });

      const data = await response.json();
      console.log("Deeplink response:", data);

      if (data?.responseCode === 0 && data?.data?.shortLink) {
        setDeeplink(data.data.shortLink);
        console.log("Deeplink generated:", data.data.shortLink);
      } else {
        console.error("Failed to generate deeplink:", data.responseMessage);
      }
    } catch (error) {
      console.error("Error generating deeplink:", error);
    } finally {
      setIsGeneratingDeeplink(false);
    }
  };

  const openBankingApp = () => {
    if (deeplink) {
      window.open(deeplink, "_blank");
    } else {
      console.error("No deeplink available");
    }
  };

  // Auto-generate QR when component mounts or amount changes
  useEffect(() => {
    if (amount && amount > 0) {
      generateQR();
    }
  }, [amount]);

  const getStatusStyles = () => {
    if (statusMessage.toLowerCase().includes("waiting")) {
      return {
        background: "bg-slate-800/50",
        border: "border-slate-600/30",
        text: "text-slate-300",
      };
    }

    if (statusMessage.toLowerCase().includes("completed")) {
      return {
        background: "bg-gradient-to-tl from-emerald-400 to-green-500",
        border: "border-green-500/40",
        text: "text-white",
      };
    }

    if (
      statusMessage.toLowerCase().includes("failed") ||
      statusMessage.toLowerCase().includes("error") ||
      statusMessage.toLowerCase().includes("invalid")
    ) {
      return {
        background: "bg-red-500/20",
        border: "border-red-500/40",
        text: "text-red-300",
      };
    }

    return {
      background: "bg-slate-800/50",
      border: "border-slate-600/30",
      text: "text-slate-300",
    };
  };

  const checkTransactionStatus = async () => {
    if (!md5Checksum) return;

    try {
      const response = await fetch(`${baseUrl}/v1/check_transaction_by_md5`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ md5: md5Checksum }),
      });

      const data = await response.json();
      console.log("Checking payment status...");

      if (data?.responseCode === 0 && data?.responseMessage === "Success") {
        setStatusMessage("Payment completed successfully!");
        if (onPaymentSuccess) {
          onPaymentSuccess("KHQR", amount);
        }
        stopPolling();
        if (onClose) {
          onClose();
        }
      } else {
        setStatusMessage("Waiting for payment...");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setStatusMessage("Error checking payment status.");
      stopPolling();
    }
  };

  const startPolling = () => {
    if (!pollingInterval) {
      console.log("Starting payment status polling...");
      const intervalId = setInterval(checkTransactionStatus, 3000);
      setPollingInterval(intervalId);
      checkTransactionStatus();
    }
  };

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
      console.log("Stopped payment status polling");
    }
  };

  useEffect(() => {
    if (md5Checksum) {
      startPolling();
    }
  }, [md5Checksum]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {isGenerating && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Generating QR Code...</p>
        </div>
      )}

      {statusMessage && (
        <div
          className={`
            mb-4 p-3 rounded-lg border
            ${getStatusStyles().background} 
            ${getStatusStyles().border}
          `}
        >
          <p className={`text-sm text-center ${getStatusStyles().text}`}>
            {statusMessage}
          </p>
        </div>
      )}

      {qrImage && !isGenerating && (
        <div className="text-center">
          <div className="bg-red p-4 rounded-2xl inline-block mb-4">
            <svg
              width="300"
              height="370"
              viewBox="0 0 442 622"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto"
            >
              <g filter="url(#filter0_d_322_2)">
                <path d="M421 21H21V601H421V21Z" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 21H421V90V90.6V123.5L388.1 90.6H21V21Z"
                  fill="#E21A1A"
                />
                <path
                  d="M233.525 53.8332V60.4999H226.972C226.316 60.4999 225.825 59.9999 225.825 59.3332V53.8332C225.825 53.1665 226.316 52.6665 226.972 52.6665H232.215C233.034 52.4999 233.525 53.1665 233.525 53.8332Z"
                  fill="white"
                />
                <path
                  d="M264 56.5H260.723C260.723 52.5 257.61 49.3333 253.678 49.3333C250.565 49.3333 247.944 51.3333 246.96 54.3333C246.797 55 246.633 55.8333 246.633 56.5V67H246.469C244.667 67 243.356 65.5 243.356 63.8333V56.5C243.356 53.6667 244.503 50.8333 246.633 48.8333C248.599 47 251.057 46 253.678 46C259.412 46 264 50.6667 264 56.5Z"
                  fill="white"
                />
                <path
                  d="M264 66.9999H259.412L258.265 65.8333L255.808 63.3333L252.367 59.8333H256.955L264 66.9999Z"
                  fill="white"
                />
                <path
                  d="M234.672 63.6667H224.842C223.695 63.6667 222.712 62.6667 222.712 61.5V51.5C222.712 50.3333 223.695 49.3333 224.842 49.3333H234.672C235.819 49.3333 236.802 50.3333 236.802 51.5V61.5L240.079 64.8333V49.1667C240.079 47.3333 238.604 46 236.966 46H222.712C220.909 46 219.599 47.5 219.599 49.1667V63.6667C219.599 65.5 221.073 66.8333 222.712 66.8333H237.949L234.672 63.6667Z"
                  fill="white"
                />
                <path
                  d="M194.859 67H190.271L180.768 57.1667V67H177V46H180.768V55.3333L189.944 46H194.367L184.537 56L194.859 67Z"
                  fill="white"
                />
                <path
                  d="M212.062 46H215.667V67H212.062V57.8333H201.576V67H197.808V46H201.576V54.8333H212.062V46Z"
                  fill="white"
                />
                <path
                  d="M21 218.5H421"
                  stroke="black"
                  strokeOpacity="0.5"
                  strokeDasharray="8 8"
                />
              </g>

              <text
                x="50"
                y="140"
                fontFamily="Arial"
                fontSize="24"
                fill="black"
              >
                Scan Here
              </text>
              <text
                x="50"
                y="180"
                fontFamily="Arial"
                fontSize="24"
                fill="black"
                fontWeight="bold"
              >
                {amount.toFixed(2)} USD
              </text>

              <image href={qrImage} x="50" y="230" width="350" height="350" />

              <defs>
                <filter
                  id="filter0_d_322_2"
                  x="0"
                  y="0"
                  width="442"
                  height="622"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="10.5" />
                  <feColorMatrix
                    in2="hardAlpha"
                    operator="out"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_322_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_322_2"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Open Banking App Button */}
            {deeplink && (
              <button
                onClick={openBankingApp}
                disabled={isGeneratingDeeplink}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-base font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isGeneratingDeeplink ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <>🏦 Open Banking App</>
                )}
              </button>
            )}

            {/* Refresh QR Button */}
            <button
              onClick={generateQR}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Refresh QR Code"}
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-sm text-slate-400 text-center">
            <p className="mb-2">Choose your payment method:</p>
            <p>
              📱 <strong>Mobile:</strong> Tap "Open Banking App" button
            </p>
            <p>
              💻 <strong>Desktop:</strong> Scan QR code with your mobile banking
              app
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KHQRComponent;
