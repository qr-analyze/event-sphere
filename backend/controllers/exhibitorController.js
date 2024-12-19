const Exhibitor = require('../models/exhibitor');

// Get all exhibitors
const getAllExhibitors = async (req, res) => {
    try {
        const exhibitors = await Exhibitor.find();
        res.status(200).json(exhibitors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exhibitors', error });
    }
};

// Register a new exhibitor
const registerExhibitor = async (req, res) => {
    const { companyName, email, boothPreferences, description, contactInfo } = req.body;

    // Validate required fields
    if (!companyName || !email || !boothPreferences || !description || !contactInfo) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newExhibitor = new Exhibitor({
            companyName,
            email,
            boothPreferences,
            description,
            contactInfo,
            logo: req.file ? req.file.path : undefined, // Handle logo if uploaded
        });

        // Save the new exhibitor to the database
        await newExhibitor.save();
        res.status(201).json({ success: true, message: 'Exhibitor registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering exhibitor', error });
    }
};

// Get exhibitor by ID
const getExhibitorById = async (req, res) => {
    try {
        const exhibitor = await Exhibitor.findById(req.params.exhibitorId);
        if (!exhibitor) return res.status(404).json({ message: 'Exhibitor not found' });
        res.status(200).json(exhibitor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exhibitor', error });
    }
};

// Update exhibitor by ID
const updateExhibitor = async (req, res) => {
    try {
        const updatedExhibitor = await Exhibitor.findByIdAndUpdate(req.params.exhibitorId, req.body, { new: true });
        if (!updatedExhibitor) return res.status(404).json({ message: 'Exhibitor not found' });
        res.status(200).json(updatedExhibitor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating exhibitor', error });
    }
};

// Approve exhibitor by ID
const approveExhibitor = async (req, res) => {
    try {
        const exhibitor = await Exhibitor.findById(req.params.exhibitorId);
        if (!exhibitor) return res.status(404).json({ message: 'Exhibitor not found' });
        exhibitor.isApproved = true;
        await exhibitor.save();
        res.status(200).json({ success: true, message: 'Exhibitor approved' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving exhibitor', error });
    }
};

// Delete exhibitor by ID
const deleteExhibitor = async (req, res) => {
    try {
        const { exhibitorId } = req.params;
        const exhibitor = await Exhibitor.findByIdAndDelete(exhibitorId);

        if (!exhibitor) {
            return res.status(404).json({ message: 'Exhibitor not found' });
        }

        res.status(200).json({ message: 'Exhibitor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting exhibitor', error });
    }
};

module.exports = {
    getAllExhibitors,
    registerExhibitor,
    updateExhibitor,
    approveExhibitor,
    getExhibitorById,
    deleteExhibitor
};
