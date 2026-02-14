import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://chatbot-backend-one-omega.vercel.app/auth/verifyotp",
        { email, otp }
      );

      if (res.status === 200) {
        navigate("/resetpassword");
      }

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid OTP"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-darkbg flex items-center justify-center px-6 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-96 h-96 bg-primary/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-secondary/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="w-full max-w-md bg-cardbg backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl z-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            🔐 Enter OTP
          </h1>
          <p className="text-gray-400 mt-2">
            Enter the OTP sent to your email
          </p>
        </div>

        {message && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-indigo-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-gray-400 text-sm text-center mt-4">
            Didn't receive OTP?{" "}
            <span
              onClick={() => navigate("/verifyemail")}
              className="text-secondary hover:underline cursor-pointer"
            >
              Resend
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Otp;
