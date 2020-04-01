
exports.up = function(knex) {
    return knex.schema.createTable('project_template', (table) => {
        table.increments()
        table.string('title')
          .notNullable()
        table.integer('user_id')
          .references('id')
          .inTable('user')
          .notNullable()
          .onDelete('CASCADE')
          .index()
        table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('project_template')
  };
  