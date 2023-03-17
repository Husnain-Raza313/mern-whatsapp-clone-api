const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require('./middleware/error')

dotenv.config();

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api', require('./routes/chatroomMessageRoutes'))
app.use(errorHandler)

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
