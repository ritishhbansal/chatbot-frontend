import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://chatbot-backend-one-omega.vercel.app/auth/login",
      formData
    );

    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("oldChats", JSON.stringify(res.data.oldChats));
      console.log("Full login response:", res.data);
      navigate("/bot");
    }

  } catch (err) {
    console.log("Login error:", err);
    alert(err.response?.data?.message || "Invalid credentials");
  }
};


  return (
    <div className="min-h-screen bg-darkbg flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-96 h-96 bg-primary/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-secondary/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="w-full max-w-md bg-cardbg backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl z-10">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            🔐 Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Login to continue chatting with AI
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

       <form onSubmit={handleSubmit} className="flex flex-col gap-4">

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={handleChange}
    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    required
  />

  {/* Forgot Password Link */}
  <div className="flex justify-end text-sm">
    <span
      onClick={() => navigate("/verifyemail")}
      className="text-blue-400 hover:text-blue-300 cursor-pointer transition"
    >
      Forgot Password?
    </span>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="bg-primary hover:bg-indigo-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

  <p className="text-gray-400 text-sm text-center mt-4">
    Don't have an account?{" "}
    <span
      onClick={() => navigate("/register")}
      className="text-secondary hover:underline cursor-pointer"
    >
      Create Account
    </span>
  </p>

</form>

      </div>
    </div>
  );
};

export default Login;
