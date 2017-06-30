
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teamuser', (table) => {
    table.integer('team_id').notNullable();
    table.integer('user_id').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teamuser')
};
