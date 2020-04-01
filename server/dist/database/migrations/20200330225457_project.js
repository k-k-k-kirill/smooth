
exports.up = function(knex) {
    return knex.schema.createTable('project', (table) => {
        table.increments()
        table.string('title').notNullable()
        table.integer('user_id')
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .index()
            .notNullable()
        table.integer('template_id')
            .references('id')
            .inTable('project_template')
            .onDelete('CASCADE')
            .index()
        table.integer('budget_time')
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('project')
};
