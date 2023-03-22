const express = require("express");
const { errorHandler } = require("../middleware/error");
const cors = require("cors");

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/users", require("../routes/userRoutes"));
  app.use("/api", require("../routes/chatroomMessageRoutes"));
  app.use(errorHandler);
  return app;
};
module.exports = createServer;
