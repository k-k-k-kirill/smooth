
exports.up = function(knex) {
    return knex.schema.createTable('task', (table) => {
        table.increments()
        table.string('title')
          .notNullable()
        table.boolean('completed')
          .defaultTo(false)
        table.datetime('due_date')
        table.integer('project_id')
          .references('id')
          .inTable('project')
          .onDelete('CASCADE')
          .index()
        table.integer('phase_id')
          .references('id')
          .inTable('phase')
          .onDelete('CASCADE')
          .index()
        table.integer('task_template_id')
          .references('id')
          .inTable('task_template')
          .onDelete('CASCADE')
          .index()
        table.integer('time_worked')
        table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('task')
  };
  