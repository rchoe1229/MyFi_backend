const express = require("express");
const router = express.Router();
const database = require("../database/database");

const { Model } = require("objection");
Model.knex(database);
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { response } = require("express");

/* GET users listing. */
router.get("/users", (req, res) => {
  User.query().then((users) => res.send({ users }));
});

router.post("/users", (req, res) => {
  const { user } = req.body;
  bcrypt
    .hash(user.password, 12)
    .then((hashedPassword) => {
      return database("users")
        .insert({
          id: user.id,
          username: user.username,
          password: hashedPassword,
          age: user.age,
        })
        .returning("*");
    })
    .then((users) => {
      const user = users[0];
      res.json({ user });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.post("/login", (req, res) => {
  const { user } = req.body;
  database("users")
  .select()
  .where({ username: user.username })
  .first()
  .then(retrievedUser => {
    console.log("retrievedUser", retrievedUser);
    if (retrievedUser.id) throw new Error("No such user exists dawg");

      return bcrypt.compare(user.password, retrievedUser.password);
    })
    .then((arePasswordsTheSame) => {
      if (!arePasswordsTheSame) throw new Error("Wrong password home slice");

      res.json({ message: "We got a match!" });
    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;
