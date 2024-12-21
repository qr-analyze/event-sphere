const Schedule = require('../models/schedualModel');

// Get all schedules
const getSchedules = async (req, res) => {
    const schedules = await Schedule.find();
    res.json(schedules);
};

// Create a new schedule
const createSchedule = async (req, res) => {
    const { title, date, timeSlot, speaker, topic, location } = req.body;
    const schedule = new Schedule({ title, date, timeSlot, speaker, topic, location });
    const createdSchedule = await schedule.save();
    res.status(201).json(createdSchedule);
};

// Update a schedule
const updateSchedule = async (req, res) => {
    const { id } = req.params;  // Get the schedule ID from the request params
    const { title, date, timeSlot, speaker, topic, location } = req.body;  // Get the updated data from the request body

    // Find the schedule by its ID
    const schedule = await Schedule.findById(id);

    if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
    }

    // Update the schedule fields
    schedule.title = title || schedule.title; // Only update if the new value exists
    schedule.date = date || schedule.date;
    schedule.timeSlot = timeSlot || schedule.timeSlot;
    schedule.speaker = speaker || schedule.speaker;
    schedule.topic = topic || schedule.topic;
    schedule.location = location || schedule.location;

    // Save the updated schedule
    const updatedSchedule = await schedule.save();

    // Return the updated schedule in the response
    res.json(updatedSchedule);
};

// Delete a schedule
const deleteSchedule = async (req, res) => {
    const { id } = req.params;

    // Find the schedule by its ID
    const schedule = await Schedule.findById(id);

    if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
    }

    // Use deleteOne instead of remove
    await Schedule.deleteOne({ _id: id });

    res.json({ message: 'Schedule removed' });
};
module.exports = { getSchedules, createSchedule, updateSchedule, deleteSchedule };
