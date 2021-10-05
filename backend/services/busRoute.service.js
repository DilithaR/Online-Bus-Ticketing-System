const BusRoute = require('../models/busRoute.model');

const addBusRoute = async (request, response) => {

    const busRoute = new BusRoute(request.body);

    console.log(busRoute);

    await busRoute.save((error, busRoute) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                busRoute: busRoute
            })
        }
    });
}
const getBusRoutes = async (request, response) => {
    try {
        const busRoute = await BusRoute.find();
        response.status(200).json({
            success: true,
            busRoute: busRoute
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

const getBusRoute = async (request, response) => {
    try {
        BusRoute.findById(request.params.id, (error, data) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    busRoute: data
                })
            }
        })
    } catch (e) {
        console.log(e);
    }
}

const updateBusRoute = async (request, response) => {
    const busRoute = new BusRoute(request.body);

    console.log(busRoute);

    await BusRoute.findByIdAndUpdate(request.body._id, busRoute,
        (error, busRoute) => {
            if (error) {
                response.status(500).json({error: error.message});
            } else {
                response.status(200).json({
                    success: true,
                    busRoute: busRoute
                })
            }
        });
}

const deleteBusRoute = async (request, response) => {
    await BusRoute.findByIdAndRemove(request.params.id, (error, busRoute) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                busRoute: busRoute
            })
        }
    })
}


module.exports = {
    addBusRoute,
    getBusRoutes,
    getBusRoute,
    updateBusRoute,
    deleteBusRoute
}
