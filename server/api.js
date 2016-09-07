const bookshelf = require("./bookshelf");
const {Model, knex} = bookshelf;

//knex.on("query", (q) => console.log(`Query: ${q}`));
//knex.on("query-response", (q) => console.log(`Query response: ${q}`));
//knex.on("query-error", (q) => console.log(`Query error: ${q}`));

function createUserTable(table) {
  table.increments("id").primary();
  table.string("username").index().unique();
  table.string("password");
  table.timestamps();
}

function createTicketTable(table) {
  table.increments();
  table.timestamps();
  table.bigInteger("creator").unsigned().index().references("id").inTable("users");
}

knex.schema.dropTableIfExists("tickets")
  .then(() => knex.schema.dropTableIfExists("users"))
  .then(() => knex.schema.createTable("users", createUserTable))
  .then(() => knex.schema.createTable("tickets", createTicketTable))
  .then(() => {
    const User = Model.extend({
      tableName: "users",
      tickets() {
        return this.hasMany(Ticket, "owner");
      }
    });

    const Ticket = Model.extend({
      tableName: "tickets",
      creator() {
        return this.belongsTo(User, "owner");
      }
    });

    return addTestData({User, Ticket});
  })
  .catch((e) => console.log(e));


function addTestData({User, Ticket}) {
  return new User({username: "admin", password: "password"}).save()
    .then((user) => {
      //console.log("admin", typeof user.get("id"));
      return new Ticket({creator: user.get("id")}).save();
    })
    .then((ticket) => new User({id: ticket.get("owner")}).fetch())
    .then(console.log.bind(console));
}

module.exports = () => {
  const passport = require("passport");
  const express = require("express");
  const router = express.Router();

  router.get("/foo", (req, res) => {
    res.send("bar");
  });

  return router;
};
