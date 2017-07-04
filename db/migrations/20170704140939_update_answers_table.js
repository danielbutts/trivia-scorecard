
exports.up = function(knex, Promise) {
  return knex.schema.table('answers', (table) => {
    table.renameColumn('answer', 'text');
    table.integer('question_id').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('answers', (table) => {
    table.renameColumn('text', 'answer');
    table.dropColumn('question_id');
  })
};
