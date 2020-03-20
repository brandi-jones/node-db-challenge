const db = require("../data/dbConfig.js");

module.exports = {
    addProject,
    getProjects,
    addTaskForProject,
    getTasksForProject
};


function addProject(project) {
    return db('projects')
        .insert(project)
}

function getProjects() {
    return db('projects');
}

function addTaskForProject(task) {
    return db('tasks')
        .insert(task)
}

function getTasksForProject(id) {
    return db('projects')
        .join('tasks', 'projects.id', 'tasks.project_id')
        .where('project_id', id) //project_id = id
        .select('projects.name as project_name', 'projects.description as project_description', 'tasks.description as task_description', 'tasks.notes as task_notes', 'tasks.completed', 'tasks.id')
}