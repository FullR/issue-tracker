module.exports = () => {
  const passport = require("passport");
  const express = require("express");
  const router = express.Router();

  router.get("/foo", (req, res) => {
    res.send("bar");
  });

  return router;
};
