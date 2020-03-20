

exports.seed = async function(knex) {
  const tasks = [
    {
      description: "Paint Living Room",
      notes: "Paint entire living room with grey colored paint",
      project_id: 1
    },
    {
      description: "Paint Kitchen",
      notes: "Paint entire kitchen with grey colored paint",
      project_id: 1
    },
    {
      description: "Take After-Ceremony Photos",
      notes: "Take photos of couple after their ceremony",
      project_id: 2
    },
    {
      description: "Edit Wedding Photos",
      notes: "Edit photos in Lightroom",
      project_id: 2
    },

  ]

  await knex('tasks').truncate();

  return knex('tasks').insert(tasks);
}
