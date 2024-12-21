const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); // Import the user controller

// Create user (sign-up)
router.post('/create', userController.createUser);

// Get user profile by ID
router.get('/:userId', userController.getUser);

// Get all users (new endpoint)
router.get('/', userController.getAllUsers);  // Added this route to fetch all users

// Update user profile by ID
router.put('/:userId', userController.updateUser);

// Delete user profile by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
