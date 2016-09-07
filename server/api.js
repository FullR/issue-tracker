module.exports = () => {
  const passport = require("passport");
  const express = require("express");
  const router = express.Router();
  const Sequelize = require("sequelize");

  const s = new Sequelize("issue-tracker", "postgres", "password", {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  const User = s.define("User", {
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });

  s.authenticate()
    .then(() => console.log("Connected to db"))
    .then(() => s.sync())
    .then(() => User.find({where: {username: "admin"}}))
    .then((error, admin) => {
      if(!admin) {
        console.log("Admin account not found. Creating with username: admin, password: password");
        return User.create({
          username: "admin",
          password: "password"
        }).then((admin) => admin.save());
      }
    })
    .catch((error) => console.log(error));

  router.get("/foo", (req, res) => {
    res.send("bar");
  });

  return router;
};
