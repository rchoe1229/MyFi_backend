const express = require("express");
const router = express.Router();
const database = require("../database/database");

const { Model } = require("objection");
Model.knex(database);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    .then((retrievedUser) => {
      if (!retrievedUser) throw new Error("IT was all a lie");

      return Promise.all([
        bcrypt.compare(user.password, retrievedUser.password),
        Promise.resolve(retrievedUser),
      ]);
    })
    .then((results) => {
      const arePasswordsTheSame = results[0];
      const user = results[1];

      if (!arePasswordsTheSame) throw new Error("IT was all a lie");

      const payload = { username: user.username}
      const secret = "QUIET"

      jwt.sign(payload, secret, (error, token) => {
        if(error) throw new Error("Signing did not work")
        res.json({ token });
      })

    })
    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;
