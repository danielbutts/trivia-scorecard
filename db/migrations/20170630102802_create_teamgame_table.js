
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teamgame', (table) => {
    table.integer('team_id').notNullable();
    table.integer('game_id').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teamgame')
};
