const co = require("co");
const bcrypt = require("../util/bcrypt-promise");
const getUserByName = require("./get-user-by-name");

module.exports = co.wrap(function* (knex, username, password) {
  const user = yield getUserByName(knex, username);
  const isPasswordCorrect = yield bcrypt.compare(password, user.password);

  return isPasswordCorrect ? user : null;
});
