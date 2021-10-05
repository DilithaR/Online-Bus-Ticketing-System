const mongoose = require('mongoose');

const inspectorSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    userName: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
});

const Inspector = mongoose.model('Inspector', inspectorSchema);

module.exports = Inspector;
