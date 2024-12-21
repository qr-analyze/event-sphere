import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("attendee");
    const [error, setError] = useState(""); // State for error messages
    const [success, setSuccess] = useState(false); // State for success messages

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state
        setSuccess(false); // Reset success state

        // Basic validation before sending the request
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password, // The password will be hashed by the server
                role,
            });

            console.log("Registration successful!", data);
            setSuccess(true); // Set success message
        } catch (error) {
            console.error(error.response?.data?.message || "Registration failed!");
            setError(error.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="form-container">
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
                        <option value="admin">Admin</option>

                        <option value="exhibitor">Exhibitor</option>
                        <option value="attendee">Attendee</option>
                    </select>
                </div>
                <button type="submit" className="btn">
                    Register
                </button>
            </form>

            {/* Display error or success messages */}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Registration successful! You can now log in.</p>}
        </div>
    );
};

export default RegisterForm;
