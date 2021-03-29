const { Model } = require("objection")

class Transactions extends Model {
  static tableName = 'transactions'
}

module.exports = Transactions