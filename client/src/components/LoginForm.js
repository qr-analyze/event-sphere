import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error messages

        try {
            console.log("Sending login request...");
            const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            console.log("Login successful. Received data:", data);

            // Store the token in localStorage
            localStorage.setItem("token", data.token);

            // Decode the JWT token
            const decodedToken = jwtDecode(data.token);
            console.log("Decoded token:", decodedToken);

            // Handle redirection based on the role
            if (decodedToken.role) {
                switch (decodedToken.role) {
                    case "admin":
                        navigate("/admin");
                        break;
                    case "organizer":
                        navigate("/organizer");
                        break;
                    case "exhibitor":
                        navigate("/exhibitor");
                        break;
                    case "attendee":
                        navigate("/attendee");
                        break;
                    default:
                        console.error("Unknown role:", decodedToken.role);
                        setError("Invalid user role.");
                }
            } else {
                console.error("Role not found in token.");
                setError("Invalid role in token.");
            }
        } catch (error) {
            console.error("Error during login:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Login failed! Please try again.");
        }
    };

    // Handle logout
    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <button type="submit" className="btn">Login</button>
            </form>

            {/* Logout button */}
            {localStorage.getItem("token") && (
                <button onClick={handleLogout} className="btn logout-btn">
                    Logout
                </button>
            )}
        </div>
    );
};

export default LoginForm;
