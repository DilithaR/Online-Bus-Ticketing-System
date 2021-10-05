const express = require('express');
const router = express.Router();

const InspectorService = require('../services/inspector.service');

module.exports = () => {
    router.post('/login', InspectorService.loginInspector)
    router.get('/', InspectorService.getInspectors);
    router.post('/', InspectorService.addInspector);
    router.delete('/:id', InspectorService.deleteInspector);

    return router;
}
