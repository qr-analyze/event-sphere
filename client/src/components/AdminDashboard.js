import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./Navbar";
const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page after logout
        navigate("/login");
    };

    return (
        <><NavbarComponent /><div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div></>
    );
};

export default AdminDashboard;
