const Conductor = require('../models/conductor.model');

const addConductor = async (request, response) => {

    const conductor = new Conductor(request.body);

    await conductor.save((error, conductor) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                conductor: conductor
            })
        }
    });
}

const getConductor = async (request, response) => {
    try {
        const conductor = await Conductor.find();
        response.status(200).json({
            success: true,
            conductor: conductor
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}


const deleteConductor = async (request, response) => {
    await Conductor.findByIdAndRemove(request.params.id, (error, conductor) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                conductor: conductor
            })
        }
    })
}

const loginConductor = async (request, response) => {
    await Conductor.findOne({userName: request.body.username}).then((data) => {
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
    addConductor,
    getConductor,
    deleteConductor,
    loginConductor
}
