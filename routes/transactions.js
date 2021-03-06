const express = require("express");
const router = express.Router();
const database = require('../database/database')

const { Model } = require("objection")
Model.knex(database)

const { authenticate } = require('./authenticate')
const Transactions = require("../models/Transactions")

/* GET transactions listing. */
router.get("/transactions", authenticate, (req, res, next) => {
  Transactions.query()
    .then((transactions) => res.send({transactions}));
});

module.exports = router;