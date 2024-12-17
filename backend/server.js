const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
