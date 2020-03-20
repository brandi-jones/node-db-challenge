
exports.seed = async function(knex) {
  const projects = [
    {
      name: "Paint House",
      description: "Re-paint all walls on the inside of house for client"
    },
    {
      name: "Take Wedding Photos",
      description: "Take photos for a client's wedding ceremony and dinner/after party"
    }
  ]

  await knex('projects').truncate();

  return knex('projects').insert(projects);
}
