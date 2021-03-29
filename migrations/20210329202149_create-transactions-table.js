
exports.up = function(knex) {
  return knex.schema.createTable('transactions', table => {
    table.integer('amount')
    table.string('category')
    table.string('type')
    table.string('date')
    table.string('id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transactions')
};
