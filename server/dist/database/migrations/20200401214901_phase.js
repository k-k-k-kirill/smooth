
exports.up = function(knex) {
  return knex.schema.createTable('phase', (table) => {
      table.increments()
      table.string('title')
        .notNullable()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('phase')
};
