const Expo = require('../models/Expo');

exports.getAllExpos = async (req, res) => {
    try {
        const expos = await Expo.find();
        res.status(200).json(expos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expos', error: err.message });
    }
};

exports.createExpo = async (req, res) => {
    try {
        const { title, date, location, description, theme } = req.body;

        if (!title || !date || !location) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const expo = new Expo({
            title,
            date,
            location,
            description,
            theme,
        });

        await expo.save();
        res.status(201).json({
            message: 'Expo created successfully',
            expo,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating expo', error: err.message });
    }
};

exports.getExpoById = async (req, res) => {
    try {
        const expo = await Expo.findById(req.params.expoId);
        if (!expo) return res.status(404).json({ message: 'Expo not found' });
        res.status(200).json(expo);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching expo', error: err.message });
    }
};

exports.updateExpo = async (req, res) => {
    try {
        const expo = await Expo.findByIdAndUpdate(req.params.expoId, req.body, { new: true });
        if (!expo) return res.status(404).json({ message: 'Expo not found' });
        res.status(200).json({
            message: 'Expo updated successfully',
            expo,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating expo', error: err.message });
    }
};

exports.deleteExpo = async (req, res) => {
    try {
        const expo = await Expo.findByIdAndDelete(req.params.expoId);
        if (!expo) return res.status(404).json({ message: 'Expo not found' });
        res.status(200).json({ message: 'Expo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting expo', error: err.message });
    }
};
