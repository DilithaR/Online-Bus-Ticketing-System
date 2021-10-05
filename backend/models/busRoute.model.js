const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema({
    from: {type: String, required: true, trim: true},
    to: {type: String, required: true, trim: true},
    startTime: {type: String, required: true, trim: true},
    endTime: {type: String, required: true, trim: true},
    bus: {type: String, required: true, trim: true},
    seatCount: {type: Number, required: true, trim: true},
});

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;
