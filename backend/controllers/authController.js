const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const redis = require("redis");

// Create a Redis client for production (ensure that the URL is correct in your environment)
const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect().catch(err => console.error("Redis connection error:", err));

// Registration Controller
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role, // admin, organizer, exhibitor, attendee
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ message: "Error during registration" });
    }
};

// Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve user and explicitly include password
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT access token
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Generate JWT refresh token
        const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d", // Refresh token lasts longer
        });

        console.log("Login successful for email:", email);
        res.json({ accessToken, refreshToken });
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

    // Add the token to the Redis blacklist
    client.sAdd("tokenBlacklist", token, (err, reply) => {
        if (err) {
            return res.status(500).json({ message: "Error blacklisting token" });
        }

        res.status(200).json({ message: "Logout successful" });
    });
};

module.exports = { registerUser, loginUser, logoutUser, client };
