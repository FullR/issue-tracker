const passport = require("passport");
const db = require("./db");

module.exports = () => {
  const passport = require("passport");
  const express = require("express");
  const router = express.Router();

  router.get("/foo", (req, res) => {
    res.send("bar");
  });

  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({success: true, user: req.user});
  });

  return router;
};
