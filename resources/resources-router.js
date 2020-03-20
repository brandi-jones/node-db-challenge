const express = require('express');

const Resources = require('./resources-model.js');

const router = express.Router();


//get all resources
router.get('/', (req, res) => {
    Resources.getResources()
    .then(resources => {
        res.json(resources)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get resources'})
    })
})


//post a resource
router.post('/', (req, res) => {
    Resources.addResource(req.body)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to add resource'})
    })
})


module.exports = router;