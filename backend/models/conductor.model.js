//test
const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema({
    userName: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    bus: {type: String, required: true, trim: true}
});

const Conductor = mongoose.model('Conductor', conductorSchema);
module.exports = Conductor;
