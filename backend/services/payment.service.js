const Payment = require('../models/payment.model');

const addPayment = async (request, response) => {

    const payment = new Payment(request.body);

    await payment.save((error, payment) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                payment: payment
            })
        }
    });
}

const getPayments = async (request, response) => {
    try {
        const payment = await Payment.find();
        response.status(200).json({
            success: true,
            payment: payment
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    addPayment,
    getPayments
}
