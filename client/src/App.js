import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";
import ExhibitorDashboard from "./components/ExhibitorDashboard";
import AttendeeDashboard from "./components/AttendeeDashboard";
import ExpoManagement from './components/expoManagement';
import ExpoList from './components/exposList';


import ExhibitorForm from './components/ExhibitorForm';
import ExhibitorList from './components/ExhibitorList';
import { jwtDecode } from "jwt-decode";

// ProtectedRoute component to ensure the user is logged in and the token is valid
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    // Invalid token
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

// RedirectBasedOnRole component for redirection based on user's role
const RedirectBasedOnRole = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "admin" || decodedToken.role === "organizer") {
        navigate("/admin");
      } else if (decodedToken.role === "exhibitor") {
        navigate("/exhibitor");
      } else if (decodedToken.role === "attendee") {
        navigate("/attendee");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      navigate("/login");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />


        <Route path="/" element={<RedirectBasedOnRole />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitor"
          element={
            <ProtectedRoute>
              <ExhibitorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitors"
          element={
            <ProtectedRoute>
              <ExhibitorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitor/:exhibitorId"
          element={
            <ProtectedRoute>
              <ExhibitorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitors/register"
          element={
            <ProtectedRoute>
              <ExhibitorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expos/add"
          element={
            <ProtectedRoute>
              <ExpoManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expos"
          element={
            <ProtectedRoute>
              <ExpoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendee"
          element={
            <ProtectedRoute>
              <AttendeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
