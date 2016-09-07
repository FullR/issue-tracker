const co = require("co");

module.exports = co.wrap(function* (knex, username) {
  return yield knex("users").where({username}).first();
});
