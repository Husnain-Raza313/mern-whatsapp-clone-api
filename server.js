const dotenv = require("dotenv");
const createServer = require('./config/createServer')
const connectDB = require('./config/database')

dotenv.config();

connectDB()

const app = createServer()

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

// working code for connecting the server to a websocket for the real-time chat with the client

// const io = require('socket.io')(server, {
//   pingTimeout: 120000,
//   cors: {
//       origin: 'http://localhost:3000'
//   }
// })
// module.exports = io
