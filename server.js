const dotenv = require("dotenv");
const createServer = require('./utils/createServer')
const connectDB = require('./utils/database')

dotenv.config();

connectDB()

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
