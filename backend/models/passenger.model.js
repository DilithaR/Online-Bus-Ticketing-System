const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    mobile: {type: String, trim: true},
    userName: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    email: {type: String, trim: true},
    package: {type: String, trim: true},
    expiryDate: {type: String, trim: true}
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
