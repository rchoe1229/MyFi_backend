
exports.up = function(knex) {
  return knex.schema.table('transactions', table => {
    table.integer('user_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(('transactions'), table => {
    table.integer('user_id')
  })
};
