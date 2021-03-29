const express = require("express");
const router = express.Router();
const knex = require("knex");
const config = require("../knexfile").development;
const database = knex(config);

const { Model } = require("objection")
Model.knex(database)

const User = require("../models/User")

/* GET users listing. */
router.get("/", (req, res, next) => {
  User.query()
    .then((users) => res.json({users}));
});

module.exports = router;