const jwt = require("jsonwebtoken");
const Strings = require("../config/strings");
const io = require("../server");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
    null
  );
};

const subscribeChatroom = (chatroomId) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_chatroom", (data) => {
      socket.join(chatroomId);
    });
  });
};

const broadcastMessage = (chatroomId) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      socket.to(chatroomId).emit("receive_message", data);
    });
  });
};

module.exports = {
  generateToken,
  subscribeChatroom,
  broadcastMessage,
};
