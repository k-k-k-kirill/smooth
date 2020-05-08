
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments()
        table.string('first_name')
        .notNullable()
        table.string('last_name')
        .notNullable()
        table.string('email')
        .notNullable()
        .unique()
        table.string('password')
        .notNullable()
        table.boolean('email_confirmed', false)
        .defaultTo(false)
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
