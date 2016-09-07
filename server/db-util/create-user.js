const co = require("co");
const bcrypt = require("../util/bcrypt-promise");

module.exports = co.wrap(function* (knex, username, password) {
  const hash = yield bcrypt.hash(password);
  console.log("Hash:", hash);
  return yield knex("users").insert({
    username,
    password: hash,
    created_at: new Date
  });
})
