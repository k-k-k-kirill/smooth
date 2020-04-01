
exports.up = function(knex) {
  return knex.schema.createTable('question_answer', (table) => {
      table.increments()
      table.integer('question_id')
        .references('id')
        .inTable('question')
        .notNullable()
        .onDelete('CASCADE')
        .index()
      table.integer('answer_id')
        .references('id')
        .inTable('answer')
        .notNullable()
        .onDelete()
        .index()
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('question_answer')
};
