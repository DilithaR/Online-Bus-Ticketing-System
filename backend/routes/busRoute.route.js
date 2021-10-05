const express = require('express');
const router = express.Router();

const BusRouteService = require('../services/busRoute.service');

module.exports = () => {
    router.get('/', BusRouteService.getBusRoutes);
    router.post('/', BusRouteService.addBusRoute);
    router.get('/:id', BusRouteService.getBusRoute);
    router.put('/', BusRouteService.updateBusRoute);
    router.delete('/:id', BusRouteService.deleteBusRoute)

    return router;
}
