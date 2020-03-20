
exports.seed = async function(knex) {
  const resources = [
    {
      name: "Paint",
      description: "Bucket of grey colored paint"
    },
    {
      name: "Paint Brush",
      description: "Large paint brush"
    },
    {
      name: "Camera",
      description: "Nikon D3200"
    },
    {
      name: "Lens",
      description: "Nikon 50mm f/1.8G "
    }
  ]

  await knex('resources').truncate();

  return knex('resources').insert(resources);
}
