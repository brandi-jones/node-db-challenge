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

//get a specific resource by id
router.get('/:id', (req, res) => {
    Resources.getResourceById(req.params.id) 
    .then(response => {
        if (response.length != 0) {
            res.json(response)
        } else {
            res.status(404).json({ message: `Could not find resource with id: ${req.params.id}`})
        }
        
    })
    .catch(error => {
        res.status(500).json({message: `Failed to get project with id: ${req.params.id}`})
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

//delete a resource 
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Resources.removeResource(id)
    .then(response => {
        if (response.length != 0) {
            res.json(response);
        } else {
            res.status(404).json({ message: 'Could not find resource with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to delete resource' });
    })
})


module.exports = router;