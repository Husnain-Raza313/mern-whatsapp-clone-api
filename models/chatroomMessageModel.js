const mongoose = require("mongoose");
const Strings = require("../config/strings");

const ChatroomMessageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, Strings.pleaseAddMessage],
    },
    chatroomParticipantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatroomParticipant",
      required: true,
    },
    chatroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatroomMessage", ChatroomMessageSchema);
