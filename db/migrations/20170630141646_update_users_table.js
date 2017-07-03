
exports.up = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.renameColumn('isAdmin', 'is_admin');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.renameColumn('is_admin', 'isAdmin');
  })
};
