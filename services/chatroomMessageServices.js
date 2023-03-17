const ChatroomMessage = require("../models/chatroomMessageModel");

exports.findChatroomMessages = async function (chatroomId) {
  return ChatroomMessage.find({ chatroomId });
};

exports.createChatroomMessage = async function (
  body,
  chatroomParticipantId,
  chatroomId
) {
  return ChatroomMessage.create({ body, chatroomParticipantId, chatroomId });
};
