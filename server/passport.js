const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const getUserById = require("./db-util/get-user-by-id");
const authUser = require("./db-util/auth-user");

passport.serializeUser((user, done) => {
  const {id, username} = user;
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  db.then((knex) => getUserById(knex, userId))
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

passport.use("local", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, (req, username, password, done) => {
  console.log(`Attempting login as "${username}"`);
  db.then((knex) => authUser(knex, username, password))
  .then((user) => {
    if(user) {
      console.log("User found. Logging in.");
      done(null, user);
    } else {
      console.log("User not found");
      done(null, false);
    }
  })
  .catch((error) => done(null, error));
}));

module.exports = passport;
