import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const otpSent = useRef(false);
  const email = state?.email;

  useEffect(() => {
    if (!email) {
      alert("No email provided. Redirecting to sign in...");
      navigate("/sign-in");
    } else if (!otpSent.current) {
      otpSent.current = true; 
      sendOtp();
    }
  }, [email]);

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please try again.");
      }

      alert("OTP sent successfully to your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert("OTP verified successfully!");
        navigate("/admin/dashboard", { replace: true });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter the OTP sent to your email: {email}
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={verifyOtp}
          disabled={loading || otp.length !== 6}
          className={`w-full bg-green-500 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;