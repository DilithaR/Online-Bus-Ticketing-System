const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    package: {type: String, required: true, trim: true},
    userid: {type: String, trim: true},
    date: {type: String, required: true, trim: true},
    time: {type: String, required: true}
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
