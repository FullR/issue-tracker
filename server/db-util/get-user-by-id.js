const co = require("co");

module.exports = co.wrap(function* (knex, id) {
  return yield knex("users").where({id}).first();
});
