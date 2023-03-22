const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require('./middleware/error')
const createServer = require('./utils/createServer')

dotenv.config();

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const app = createServer()

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

// const io = require('socket.io')(server, {
//   pingTimeout: 120000,
//   cors: {
//       origin: 'http://localhost:3000'
//   }
// })
// module.exports = io
