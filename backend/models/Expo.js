const mongoose = require('mongoose');
const moment = require('moment'); // To format the date easily

const expoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
});

// Define a getter for the formatted date
expoSchema.virtual('formattedDate').get(function () {
    return moment(this.date).format('MMMM Do YYYY'); // Formats date as "December 22nd 2024"
});


const Expo = mongoose.model('Expo', expoSchema);

module.exports = Expo;
