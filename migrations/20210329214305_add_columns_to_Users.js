
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('password')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(('users'), table => {
    table.string('password')
  })
};
