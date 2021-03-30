const express = require("express");
const router = express.Router();
const database = require("../database/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sign-up", (req, res) => {
  const { user } = req.body;
  bcrypt
    .hash(user.password, 12)
    .then((hashedPassword) => {
      return database("users")
        .insert({
          id: user.id,
          name: user.name,
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

      const payload = { username: user.username };
      const secret = "process.env.SECRET";

      jwt.sign(payload, secret, (error, token) => {
        if (error) throw new Error("Signing did not work");
        res.json({ token });
      });
    })
    .catch((error) => {
      res.json(error.message);
    });
});

router.get("/secret-route", authenticate, (req, res) => {
  res.json({ message: `${req.user.username} found the secret-route` });
});

function authenticate(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];

  const secret = "process.env.SECRET";
  jwt.verify(token, secret, (error, payload) => {
    if (error) res.json({ error: error.message });

    database("users")
      .select()
      .where({ username: payload.username })
      .first()
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  });
}

module.exports = [
  router,
  authenticate
]
