const express = require("express");
const router = express.Router();
const database = require('../database/database')

const { Model } = require("objection")
Model.knex(database)

const User = require("../models/User");
const { response } = require("express");

/* GET users listing. */
router.get("/", (req, res) => {
  User.query()
    .then((users) => res.send({users}));
});

router.post("/", (req,res) => {
  const { user } = req.body
  bcrypt.hash(user.password, 12)
    .then(hashedPassword => {
      return database("user")
        .insert({ 
          id: user.id,
          username: user.username,
          password: hashedPassword
        }).returning("*")
    }).then(users => {
      const user = users[0]
    res.json({ user })
    }).catch(error => {
      res.json({ error: error.message })
    })
})

module.exports = router;