const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        date: { type: String, required: true },
        timeSlot: { type: String, required: true },
        speaker: { type: String, required: true },
        topic: { type: String, required: true },
        location: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
