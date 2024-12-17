import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import for jwtDecode

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            toast.success("Login successful!");
            localStorage.setItem("token", data.token); // Store JWT token in localStorage

            // Decode the token to get user role
            const decodedToken = jwtDecode(data.token); // Use 'jwtDecode' instead of 'jwt_decode'
            if (decodedToken.role === "admin" || decodedToken.role === "organizer") {
                navigate("/admin");
            } else if (decodedToken.role === "exhibitor") {
                navigate("/exhibitor");
            } else if (decodedToken.role === "attendee") {
                navigate("/attendee");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="form-container">
            <ToastContainer />
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
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
