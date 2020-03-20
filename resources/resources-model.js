const db = require("../data/dbConfig.js")

module.exports = {
    addResource,
    getResources,
    getResourceById,
    removeResource
}

function addResource(resource) {
    return db('resources')
        .insert(resource)
        .then(response => {
            return getResourceById(response[0])
        })
}

function getResources() {
    return db('resources');
}

function getResourceById(id) {
    return db('resources')
        .where({id})
}

async function removeResource(id) {

    const removedResource = await getResourceById(id)

    return db('resources')
        .where({ id })
        .del()
        .then(() => {
            return removedResource
        })
        
}