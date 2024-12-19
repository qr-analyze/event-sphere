const mongoose = require('mongoose');

const exhibitorSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    boothPreferences: {
        type: String,  // Could be a JSON or String describing booth preferences
        required: true
    },
    logo: String, // Path to logo image if applicable
    description: String,  // Description of products/services
    contactInfo: {
        phone: String,
        address: String
    },
    isApproved: {
        type: Boolean,
        default: false // Initially not approved
    }
}, { timestamps: true });

const Exhibitor = mongoose.model('Exhibitor', exhibitorSchema);

module.exports = Exhibitor;
