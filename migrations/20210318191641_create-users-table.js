const { default: knex } = require("knex")

exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('name')
    table.string('username')
    table.integer('age')
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users')
};
