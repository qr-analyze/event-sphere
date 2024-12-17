const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI); // Updated to remove deprecated options
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit the application if MongoDB connection fails
    }

    // Additional connection event listeners
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    mongoose.connection.once("open", () => {
        console.log("MongoDB connection established successfully.");
    });
};

module.exports = connectDB;
