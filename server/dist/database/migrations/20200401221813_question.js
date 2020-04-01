
exports.up = function(knex) {
  return knex.schema.createTable('question', (table) => {
      table.increments()
      table.string('title')
        .notNullable()
      table.integer('phase_id')
        .references('id')
        .inTable('phase')
        .index()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('question')
};
