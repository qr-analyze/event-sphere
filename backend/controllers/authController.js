const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

// Registration Controller
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving (assuming the User schema handles hashing)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        // Generate JWT token with role included
        const token = generateToken(newUser._id, newUser.role);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
            token
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Error during registration" });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token with role included
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Error during login" });
    }
};

// Logout Controller
const logoutUser = (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    // Placeholder for logging out (e.g., Redis blacklisting can be implemented here)
    // In this case, we're just sending a simple response for now.
    res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
