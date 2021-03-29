const knex = require("knex");
const config = require("../knexfile").development;
const database = knex(config);

module.exports = database;
