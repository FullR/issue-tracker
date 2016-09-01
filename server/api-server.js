const express = require("express");
const morgan = require("morgan");
const api = require("./api");

module.exports = (port) => {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.static("build"));
  app.use("/api", api);

  app.listen(port, (error) => {
    if(error) {
      console.error(error);
    } else {
      console.log(`API server listening on port ${port}`);
    }
  });
};
