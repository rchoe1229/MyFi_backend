const database = require('../database/database')
const { Model } = require("objection")
const Transaction = require('./Transactions')
Model.knex(database)

class User extends Model {
  static tableName = 'users'

  static relationMappings = {
    transactions: {
      relation: Model.HasManyRelation,
      modelClass: Transaction,
      join: {
        from: "users.id",
        to: "transactions.user_id"
      }
    }
  }
}

module.exports = User