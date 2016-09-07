const knex = require("knex")({
  client: "postgres",
  connection: {
    host     : "127.0.0.1",
    user     : "postgres",
    password : "foobar321",
    database : "issue-tracker",
    charset  : "utf8"
  }
});

module.exports = require("bookshelf")(knex);
