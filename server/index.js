const apiServer = require("./api-server");
const devServer = require("./dev-server");

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if(PROD) {
  apiServer(PORT);
} else {
  apiServer(PORT - 1);
  devServer(PORT, PORT - 1);
}
