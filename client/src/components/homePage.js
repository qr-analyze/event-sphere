import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/auth/login", { email, password });
            toast.success("Login successful!");
            localStorage.setItem("token", data.token); // Save token to local storage
        } catch (error) {
            toast.error(error.response.data.message || "Login failed!");
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
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
        </div>
    );
};


export default LoginForm;
