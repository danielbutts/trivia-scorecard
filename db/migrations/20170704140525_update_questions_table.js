
exports.up = function(knex, Promise) {
  return knex.schema.table('questions', (table) => {
    table.renameColumn('question', 'text');
    table.integer('points').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('questions', (table) => {
    table.renameColumn('text', 'question');
    table.dropColumn('points');
  })
};
