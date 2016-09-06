const express = require("express");
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const getAPI = require("./api");

const LOGIN = {
  username: "admin",
  password: "password"
};

module.exports = (port) => {
  const app = express();
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use("local", new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
  }, (req, username, password, done) => {
    console.log(`Auth: ${username} ${password}`);
    if(username === LOGIN.username && password === LOGIN.password) {
      done(null, {username});
    } else {
      done(new Error("Invalid username or password"));
    }
  }));

  app.use(express.static(path.resolve(__dirname + "/../build")));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(session({
    secret: "fj890fj89wj890js0uajk9rj0q",
    resave: false,
    saveUninitialized: false
  }));
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.send("Successfully logged in!");
  });
  app.use("/api", getAPI());

  app.listen(port, (error) => {
    console.log("__dirname =", __dirname);
    if(error) {
      console.error(error);
    } else {
      console.log(`API server listening on port ${port}`);
    }
  });
};
