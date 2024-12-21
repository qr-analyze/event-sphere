const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const exhibitorRoutes = require('./routes/exhibitorRoutes');
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const expoRoutes = require("./routes/expoRoutes"); // Expo routes (create, get expos)
const scheduleRoutes = require('./routes/schedualRoutes');
const userRoutes = require('./routes/userRoutes');
// Use routes
app.use("/api/auth", authRoutes); // Public routes for authentication (register/login)
app.use("/api/admin", adminRoutes); // Protected admin routes (requires authentication)
app.use("/api/expos", expoRoutes); // Expo routes (create, get expos)
app.use("/api/exhibitors", exhibitorRoutes); // Exhibitor routes
app.use('/api/schedules', scheduleRoutes);
app.use('/api/users', userRoutes);
// Log incoming requests to the '/api/exhibitors' route for debugging
app.use('/api/exhibitors', (req, res, next) => {
    console.log('Request URL:', req.originalUrl); // Log the incoming request
    next();
});

// Test route for the home page
app.get("/", (req, res) => res.send("API is running..."));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
