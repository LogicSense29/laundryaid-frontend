import { API_BASE_URL } from "@/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const BASE = API_BASE_URL;

export default function Auth() {
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Failed to send OTP");
      toast.success("OTP sent to your email 📧");
      setStep("otp");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter the OTP");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), otp }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Invalid OTP");
      login(data.data.user, data.data.token);
      toast.success("Welcome back! 👋");
      navigate("/dashboard");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center font-poppins px-4 pt-20">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#127733]">LaundryAid</h1>
          <p className="text-sm text-gray-500 mt-1">
            {step === "email"
              ? "Enter your email to log in"
              : `Enter the OTP sent to ${email}`}
          </p>
        </div>

        {step === "email" ? (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#127733]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#127733] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={18} color="#fff" /> : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength={6}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm text-center tracking-widest text-lg focus:outline-none focus:border-[#127733]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c85f0b] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              {loading ? <ClipLoader size={18} color="#fff" /> : "Verify & Login"}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-sm text-gray-500 underline"
            >
              Use a different email
            </button>
          </form>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          Use your Email on First Booking <br/>
          No account needed — your profile is created automatically on your first booking.
        </p>
      </div>
    </div>
  );
}
