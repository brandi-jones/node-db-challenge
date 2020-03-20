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

//get a project's tasks
router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;

    Projects.getTasksForProject(id)
    .then(tasks => {
        console.log("response", tasks)
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