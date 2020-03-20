const db = require("../data/dbConfig.js");

module.exports = {
    addProject,
    getProjects,
    getProjectById,
    removeProject,
    addTaskForProject,
    getTasksForProject,
    getTaskById
};


function addProject(project) {
    return db('projects')
        .insert(project)
        .then(response => {
            return getProjectById(response[0])
        })
}

function getProjects() {
    return db('projects');
}

function getProjectById(id) {
    return db('projects')
        .where({id})
}

async function removeProject(id) {

    const removedProject = await getProjectById(id)

    return db('projects')
        .where({ id })
        .del()
        .then(() => {
            return removedProject
        })
        
}

function addTaskForProject(task) {
    return db('tasks')
        .insert(task)
        .then(response => {
            //console.log(response)
            return getTaskById(response[0])
        })
}

function getTasksForProject(id) {
    return db('projects')
        .join('tasks', 'projects.id', 'tasks.project_id')
        .where('project_id', id) //project_id = id
        .select('projects.name as project_name', 'projects.description as project_description', 'tasks.description as task_description', 'tasks.notes as task_notes', 'tasks.completed', 'tasks.id')
}

function getTaskById(id) {
    return db('tasks')
        .where({ id })
}