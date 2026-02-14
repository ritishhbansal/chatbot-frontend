import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "https://chatbot-backend-one-omega.vercel.app/auth/verifyemail",
      { email }
    );

    if (res.status === 200) {
      localStorage.setItem("resetEmail", email);
      navigate("/otp");
    }

  } catch (err) {
    setMessage(
      err.response?.data?.message || "Something went wrong."
    );
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-darkbg flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-primary/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-secondary/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="w-full max-w-md bg-cardbg backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl z-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            📧 Verify Email
          </h1>
          <p className="text-gray-400 mt-2">
            Enter your registered email to reset password
          </p>
        </div>

        {message && (
          <div className="bg-indigo-500/20 text-indigo-300 p-3 rounded-lg text-sm mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-indigo-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Verification Link"}
          </button>

          <p className="text-gray-400 text-sm text-center mt-4">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-secondary hover:underline cursor-pointer"
            >
              Back to Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default VerifyEmail;

