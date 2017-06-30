
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', (table) => {
    table.increments();
    table.string('question').notNullable();
    table.integer('game_id').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions')
};
