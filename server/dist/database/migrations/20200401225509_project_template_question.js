
exports.up = function(knex) {
  return knex.schema.createTable('project_template_question', (table) => {
      table.increments()
      table.integer('project_template_id')
        .references('id')
        .inTable('project_template')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.integer('question_id')
        .references('id')
        .inTable('question')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('project_template_question')
};
