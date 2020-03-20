const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

//get all projects
router.get('/', (req, res) => {
    Projects.getProjects()
    .then(projects => {
        res.json(projects)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get projects'})
    })
})

//get a specific project by id
router.get('/:id', (req, res) => {
    Projects.getProjectById(req.params.id) 
    .then(response => {
        if (response.length != 0) {
            res.json(response)
        } else {
            res.status(404).json({ message: `Could not find project with id: ${req.params.id}`})
        }
        
    })
    .catch(error => {
        res.status(500).json({message: `Failed to get project with id: ${req.params.id}`})
    })
})

//post a project
router.post('/', (req, res) => {
    Projects.addProject(req.body)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to add project'})
    })
})


//delete a project 
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Projects.removeProject(id)
    .then(response => {
        if (response.length != 0) {
            res.json(response);
        } else {
            res.status(404).json({ message: 'Could not find project with given id' });
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'Failed to delete project' });
    })
})

//get a project's tasks
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;

    Projects.getTasksForProject(id)
    .then(tasks => {
        if  (tasks.length) {
            res.json(tasks)
        } else {
            res.status(404).json({ message: 'Could not find steps for given project' })
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get tasks for project'})
    })
})

router.post('/:id/tasks', (req, res) => {
    const { id } = req.params
    let task = req.body;
    task.project_id = id;

    Projects.addTaskForProject(task)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to add task'})
    })

    
})





module.exports = router;