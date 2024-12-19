const express = require('express');
const router = express.Router();
const exhibitorController = require('../controllers/exhibitorController');

// Route to get all exhibitors
router.get('/', exhibitorController.getAllExhibitors);

// Route to register a new exhibitor
router.post('/register', exhibitorController.registerExhibitor);

// Route to get exhibitor by ID
router.get('/:exhibitorId', exhibitorController.getExhibitorById);

// Route to update exhibitor profile
router.put('/:exhibitorId/update', exhibitorController.updateExhibitor);

// Route to approve exhibitor
router.patch('/:exhibitorId/approve', exhibitorController.approveExhibitor);

// Route to delete exhibitor
router.delete('/:exhibitorId/delete', exhibitorController.deleteExhibitor);

module.exports = router;
