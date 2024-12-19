const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Dashboard Route - Protected and role-based access
router.get("/admin", authenticate, (req, res) => {
    // Check if the user has the 'admin' role
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    // Allow access if the user is an admin
    res.json({ message: `Welcome, ${req.user.role}!`, userId: req.user.id });
});

module.exports = router;
