const passport = require("passport");
const db = require("./db");

module.exports = () => {
  const passport = require("passport");
  const express = require("express");
  const router = express.Router();
  const auth = passport.authenticate("local");

  router.post("/login", auth, (req, res) => {
    res.json({success: true, user: req.user});
  });

  return router;
};
