import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-darkbg relative overflow-hidden flex items-center justify-center px-6">

      <div className="absolute w-[500px] h-[500px] bg-primary/30 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-secondary/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      <div className="max-w-4xl text-center z-10">

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          🤖 AI Chatbot Platform
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
          Experience intelligent conversations powered by modern AI.
          <br />
          Ask questions, get instant responses, and explore the future of chat automation.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-cardbg backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              ⚡ Instant Replies
            </h3>
            <p className="text-gray-400 text-sm">
              Get fast and accurate responses powered by AI models.
            </p>
          </div>

          <div className="bg-cardbg backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              🔐 Secure Accounts
            </h3>
            <p className="text-gray-400 text-sm">
              Your conversations stay private and protected.
            </p>
          </div>

          <div className="bg-cardbg backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              🎯 Smart Learning
            </h3>
            <p className="text-gray-400 text-sm">
              AI improves with interaction for better conversations.
            </p>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/login"
            className="bg-primary hover:bg-indigo-600 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-primary/30"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-secondary text-secondary hover:bg-secondary hover:text-black transition-all duration-300 font-semibold px-8 py-4 rounded-xl"
          >
            Create Account
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Home;



