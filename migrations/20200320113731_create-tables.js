
exports.up = function(knex) {
  return knex.schema

    .createTable('projects', tbl => {
        tbl.increments();
        tbl 
            .string('name')
            .notNullable()
        tbl 
            .string('description')
        tbl
            .boolean('completed')
            .defaultTo(false)
    })

    .createTable('resources', tbl => {
        tbl.increments();
        tbl
            .string('name')
            .notNullable()
        tbl
            .string('description')
    })

    .createTable('tasks', tbl => {
        tbl.increments();
        tbl
            .string('description')
            .notNullable();
        tbl
            .string('notes')
        tbl
            .boolean('completed')
            .defaultTo(false)
        tbl
            .integer('project_id')
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })

    .createTable('project_resources', tbl => {
        tbl.primary(['project_id', 'resource_id'])

        tbl
            .integer('project_id')
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl
            .integer('resource_id')
            .notNullable()
            .references('id')
            .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        

    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
