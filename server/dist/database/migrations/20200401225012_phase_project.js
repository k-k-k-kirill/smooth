
exports.up = function(knex) {
  return knex.schema.createTable('phase_project', (table) => {
      table.increments()
      table.integer('phase_id')
        .references('id')
        .inTable('phase')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.integer('project_id')
        .references('id')
        .inTable('project')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('phase_project')
};
