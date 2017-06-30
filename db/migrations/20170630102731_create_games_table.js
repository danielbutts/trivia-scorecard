
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('owner_id').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
};
