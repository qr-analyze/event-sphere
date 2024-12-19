const express = require('express');
const router = express.Router();
const expoController = require('../controllers/expoController');

// Route to get all expos (No authentication required)
router.get('/', expoController.getAllExpos);

// Route to create a new expo (Admin only)
router.post('/', expoController.createExpo);

// Route to get expo by ID (No authentication required)
router.get('/:expoId', expoController.getExpoById);

// Route to update expo (Admin only)
router.put('/:expoId/update', expoController.updateExpo);

// Route to delete expo (Admin only)
router.delete('/:expoId/delete', expoController.deleteExpo);

module.exports = router;
