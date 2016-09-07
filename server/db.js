const log = console.log.bind(console);
const createUser = require("./db-util/create-user");
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

const db = knex.schema
    .dropTableIfExists("tickets")
    .dropTableIfExists("users")
    .createTable("users", createUserTable)
    .createTable("tickets", createTicketTable)
    .then(() => addInitialData())
    .then(() => knex);

module.exports = db;

function createUserTable(table) {
  table.increments();
  table.string("username").index().unique();
  table.string("password", 60);
  table.timestamps();
}

function createTicketTable(table) {
  table.increments();
  table.timestamps();
  table.integer("creator_id").unsigned().index().references("users.id");
  table.string("text");
}

function addInitialData() {
  const username = "admin";
  const password = "password";

  return knex("users").where("username", username).first("id")
    .then((row) => {
      if(!row) {
        console.log("Admin account not found. Creating: username: 'admin' password: 'password'");
        return createUser(knex, username, password)
          .then(() => console.log("Done"));
      }
    });
}
