import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("resetEmail");
  console.log("Email of local storage is", email);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://chatbot-backend-one-omega.vercel.app/auth/resetpassword",
        {
          email,
          password: formData.password
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("resetEmail");

        // ✅ Show success briefly
        setMessage("Password reset successful! Redirecting...");

        // ✅ Redirect after 1.5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
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
            🔑 Reset Password
          </h1>
          <p className="text-gray-400 mt-2">
            Enter your new password
          </p>
        </div>

        {message && (
          <div className="bg-indigo-500/20 text-indigo-300 p-3 rounded-lg text-sm mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-indigo-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
