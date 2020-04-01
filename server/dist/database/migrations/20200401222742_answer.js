
exports.up = function(knex) {
  return knex.schema.createTable('answer', (table) => {
    table.increments()
    table.string('title')
        .notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('answer')
};
