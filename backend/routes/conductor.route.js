const express = require('express');
const router = express.Router();

const ConductorService = require('../services/conductor.service');

module.exports = () => {
    router.post('/', ConductorService.addConductor);
    router.post('/login', ConductorService.loginConductor);
    router.get('/', ConductorService.getConductor);
    router.delete('/:id', ConductorService.deleteConductor)
    return router;
}
