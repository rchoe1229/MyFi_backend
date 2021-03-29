const express = require("express");
const router = express.Router();
const knex = require("knex");
const config = require("../knexfile").development;
const database = knex(config);

/* GET users listing. */
router.get("/", (req, res, next) => {
  database("users")
    .then((users) => res.json({users}));
});

router.get('/:id')
module.exports = router;