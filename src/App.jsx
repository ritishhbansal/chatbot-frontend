import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bot from "./pages/Bot";
import VerifyEmail from "./pages/VerifyEmail";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route path="/register" element={<Register />} />
        
        <Route
          path="/bot"
          element={<Bot />}
        />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
