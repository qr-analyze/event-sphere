import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/homePage";
import AdminDashboard from "./components/AdminDashboard";
import ExhibitorDashboard from "./components/ExhibitorDashboard";
import AttendeeDashboard from "./components/AttendeeDashboard";
import jwt_decode from "jwt-decode";  // Correct import for jwt-decode

import "./styles.css";

// Component for auto-redirect based on role
const RedirectBasedOnRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwt_decode(token);  // Use 'jwt_decode' for decoding the JWT token
    if (decodedToken.role === "admin" || decodedToken.role === "organizer") {
      navigate("/admin");
    } else if (decodedToken.role === "exhibitor") {
      navigate("/exhibitor");
    } else if (decodedToken.role === "attendee") {
      navigate("/attendee");
    }
  }, [navigate]);

  return <div>Redirecting...</div>; // Placeholder while redirecting
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<RedirectBasedOnRole />} /> {/* Redirect based on role */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/exhibitor" element={<ExhibitorDashboard />} />
        <Route path="/attendee" element={<AttendeeDashboard />} />
        <Route path="/home" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;