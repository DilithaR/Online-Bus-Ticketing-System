const express = require('express');
const router = express.Router();

const JourneyService = require('../services/journey.service');


module.exports = () => {
    router.post('/', JourneyService.addJourney);
    router.get('/', JourneyService.getJourney);

    return router;
}