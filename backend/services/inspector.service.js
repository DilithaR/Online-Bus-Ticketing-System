const Inspector = require('../models/inspector.model');

const loginInspector = async (request, response) => {
    await Inspector.findOne({userName: request.body.username}).then((data) => {
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

const addInspector = async (request, response) => {

    const inspector = new Inspector(request.body);

    console.log(inspector);

    await inspector.save((error, inspector) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                inspector: inspector
            })
        }
    });
}
const getInspectors = async (request, response) => {
    try {
        const inspector = await Inspector.find();
        response.status(200).json({
            success: true,
            inspector: inspector
        })
    } catch (error) {
        response.status(404).json({
            success: false,
            error: error.message
        });
    }
}

const deleteInspector = async (request, response) => {
    await Inspector.findByIdAndRemove(request.params.id, (error, inspector) => {
        if (error) {
            response.status(500).json({error: error.message});
        } else {
            response.status(200).json({
                success: true,
                inspector: inspector
            })
        }
    })
}


module.exports = {
    addInspector,
    getInspectors,
    deleteInspector,
    loginInspector
}
