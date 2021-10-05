const Journey = require('../models/journey.model');

const addJourney = async (request, response) => {

    const journey = new Journey(request.body);

    await journey.save((error, journey) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                journey: journey
            })
        }
    });
}

const getJourney = async (request, response) => {
    try {
        const journey = await Journey.find();
        response.status(200).json({
            success: true,
            journey: journey
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    addJourney,
    getJourney
}
