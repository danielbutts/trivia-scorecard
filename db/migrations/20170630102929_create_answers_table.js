
exports.up = function(knex, Promise) {
  return knex.schema.createTable('answers', (table) => {
    table.increments();
    table.string('answer').notNullable();
    table.integer('game_id').notNullable();
    table.integer('team_id').notNullable();
    table.integer('is_correct').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('answers')
};
