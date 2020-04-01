
exports.up = function(knex) {
  return knex.schema.createTable('task_template', (table) => {
      table.increments()
      table.string('title')
      table.integer('answer_id')
        .references('id')
        .inTable('answer')
        .index()
      table.integer('phase_id')
        .references('id')
        .inTable('phase')
        .index()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('task_template')
};
