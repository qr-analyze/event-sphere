const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Middleware for input validation
const validateRegisterInput = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password should be at least 6 characters long"),
    body("role").notEmpty().withMessage("Role is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateLoginInput = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", validateRegisterInput, registerUser);

/**
 * @route   POST /login
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post("/login", validateLoginInput, loginUser);

module.exports = router;
