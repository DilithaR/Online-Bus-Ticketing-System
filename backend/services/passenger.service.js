const Passenger = require('../models/passenger.model');
const {request, response} = require("express");

const addPassenger = async (request, response) => {

    const passenger = new Passenger(request.body);

    await passenger.save((error, passenger) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                passenger: passenger
            })
        }
    });
}

const getPassengers = async (request, response) => {
    try {
        const passenger = await Passenger.find();
        response.status(200).json({
            success: true,
            passenger: passenger
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

const deletePassenger = async (request, response) => {
    await Passenger.findByIdAndRemove(request.params.id, (error, passenger) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                passenger: passenger
            })
        }
    })
}

const loginPassenger = async (request, response) => {
    await Passenger.findOne({userName: request.body.username}).then((data) => {
        if (data) {
            if (request.body.password === data.password) {
                response.status(200).send({
                    success: true,
                    message: 'Login success',
                    user: data
                })
            } else {
                response.status(200).send({
                    success: false,
                    message: 'Invalid password'
                })
            }
        } else {
            response.status(200).send({
                success: false,
                message: 'User doesn\'t exist!'
            })
        }
    }).catch((err) => {
        console.log(err);
        response.status(200).send({
            success: false,
            message: err.message
        });
    })
}

module.exports = {
    addPassenger,
    getPassengers,
    deletePassenger,
    loginPassenger
}
