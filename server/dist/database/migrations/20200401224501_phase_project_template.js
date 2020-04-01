
exports.up = function(knex) {
  return knex.schema.createTable('phase_project_template', (table) => {
      table.increments()
      table.integer('phase_id')
        .references('id')
        .inTable('phase')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.integer('project_template_id')
        .references('id')
        .inTable('project_template')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.timestamp(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('phase_project_template')
};
