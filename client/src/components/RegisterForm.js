import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("attendee");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                role,
            });
            toast.success("Registration successful!", data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div className="input-group">
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >

                        <option value="organizer">Organizer</option>
                        <option value="exhibitor">Exhibitor</option>
                        <option value="attendee">Attendee</option>
                    </select>
                </div>
                <button type="submit" className="btn">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
