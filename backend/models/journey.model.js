const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    passengerId: {type: String, required: true},
    startJourney: {type: String, required: true, trim: true},
    endJourney: {type: String, required: true, trim: true},
    date: {type: String, required: true, trim: true},
    time: {type: String, required: true, trim: true}
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
