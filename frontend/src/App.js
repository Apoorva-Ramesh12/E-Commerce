import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import CartPage from "./components/CartPage";
import "./styles.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="center">
      <h1>Simple E-Commerce Website</h1>
      <button align="center"  onClick={() => navigate("/login")}>Login</button>
      <button align="center" onClick={() => navigate("/signup")} style={{ marginLeft: 10 }}>Signup</button>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem("auth")) || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/signup" element={<SignupPage setAuth={setAuth} />} />
        <Route path="/admin" element={<AdminPage auth={auth} />} />
        <Route path="/shop" element={<UserPage auth={auth} />} />
        <Route path="/cart" element={<CartPage auth={auth} />} />
      </Routes>
    </Router>
  );
}

export default App;
