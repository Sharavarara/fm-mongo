const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");


mongoose
  .connect("mongodb://localhost:27017/fm-mongo")
  .catch((err) => console.log(err.message));

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
