const express = require("express");
const router = express.Router();
const database = require("../database/database");

const { Model } = require("objection");
Model.knex(database);

const { authenticate } = require('./authenticate')
const User = require("../models/User");

/* GET users listing. */
router.get("/users", authenticate, (req, res) => {
  User.query().withGraphFetched("transactions")
  .then((users) => res.send({ users }));
});

module.exports = router;
