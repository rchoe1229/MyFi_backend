const express = require("express");
const router = express.Router();
const database = require("../database/database");

const { Model } = require("objection");
Model.knex(database);

const { authenticate } = require("./authenticate");
const User = require("../models/User");

/* GET users listing. */
router.get("/users", authenticate, (req, res) => {
  User.query()
    .withGraphFetched("transactions")
    .then((users) => res.send({ users }));
});

router.get("/users/:id", authenticate, (req, res) => {
  User.query()
    .withGraphFetched("transactions")
    .where({ id: req.params.id })
    .then((user) => res.send({ user }))
  });

module.exports = router;
