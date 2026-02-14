import { FaUserCircle } from 'react-icons/fa'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Bot() {
    const [messages, setMessages] = useState ([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

useEffect(() => {
  const storedChats = localStorage.getItem("oldChats");

  if (storedChats) {
    const parsedChats = JSON.parse(storedChats);

    const formattedChats = [];

    parsedChats.forEach(chat => {
      formattedChats.push(
        { text: chat.usertext, sender: "user" },
        { text: chat.botresponse, sender: "bot" }
      );
    });

    setMessages(formattedChats);

    localStorage.removeItem("oldChats");
  }
}, []);

    const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
        const res = await axios.post(
            "https://chatbot-backend-one-omega.vercel.app/messageapi/postSend",
            { 
              userId: user?.userid,
              text: input
             }
        );

        if (res.status === 200) {
            setMessages(prev => [
                ...prev,
                { text: res.data.userMessage, sender: "user" },
                { text: res.data.botMessage, sender: "bot" }
            ]);
        }

        console.log(res.data);
        setInput("");
    } catch (err) {
        console.log("Error in sending message", err);
    }

    setLoading(false);
};
const [darkMode, setDarkMode] = useState(true);



    const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSendMessage()
      }

      const handleLogout = async () => {
  try {
    await axios.get(
      "https://chatbot-backend-one-omega.vercel.app/auth/logout",
      {},
    );

    localStorage.removeItem("user");
    localStorage.removeItem("oldChats");
    if (res.status === 200 ){
    navigate("/login");
    }
  } catch (error) {
    console.log("Logout error:", error);
  }
};


  return (
  <div className={`${darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-gray-900"} transition-all duration-500 flex flex-col min-h-screen`}>

    <header className={`${darkMode ? "bg-[#111827] border-gray-700" : "bg-white border-gray-300"} fixed top-0 left-0 w-full border-b backdrop-blur-lg z-10`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-xl font-bold tracking-wide">
          🤖 My Bot {user?.name ? `- ${user.name}` : ""}
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 transition"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button 
            onClick={handleLogout}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>

          <FaUserCircle size={30} className="cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </header>

    {/* CHAT AREA */}
    <main className="flex-1 overflow-y-auto pt-24 pb-28 flex justify-center">
      <div className="w-full max-w-4xl px-4 flex flex-col space-y-4">

        {messages.length === 0 ? (
          <div className="text-center opacity-70 text-lg mt-20">
            👋 Hi, I'm <span className="text-indigo-500 font-semibold">Bot</span>.  
            <br /> Ask me anything!
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-5 py-3 rounded-2xl max-w-[75%] shadow-lg transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white self-end"
                    : darkMode
                      ? "bg-gray-800 text-gray-200 self-start"
                      : "bg-white text-gray-800 self-start border"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-500/30 px-4 py-2 rounded-xl w-fit animate-pulse">
                Bot is typing...
              </div>
            )}
          </>
        )}
      </div>
    </main>

    {/* INPUT SECTION */}
    <footer className={`${darkMode ? "bg-[#111827] border-gray-700" : "bg-white border-gray-300"} fixed bottom-0 left-0 w-full border-t backdrop-blur-lg`}>
      <div className="max-w-4xl mx-auto px-4 py-4">

        <div className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} flex items-center rounded-full px-4 py-2 shadow-xl transition-all`}>

          <input
            type="text"
            className="flex-1 bg-transparent outline-none px-3 py-2"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md"
          >
            Send
          </button>

        </div>

      </div>
    </footer>

  </div>
);
}

export default Bot;


