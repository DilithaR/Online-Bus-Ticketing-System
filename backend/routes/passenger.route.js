const express = require('express');
const router = express.Router();

const passengerService = require('../services/passenger.service');

module.exports = () => {
    router.get('/', passengerService.getPassengers);
    router.post('/', passengerService.addPassenger);
    router.delete('/:id', passengerService.deletePassenger)
    router.post('/login', passengerService.loginPassenger)

    return router;
}
