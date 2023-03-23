const ChatroomMessage = require("../models/chatroomMessageModel");

exports.findChatroomMessages = async function (chatroomId, noOfMessages = 5, patchNumber = 0) {
  return ChatroomMessage.find({ chatroomId }).limit(noOfMessages).skip(noOfMessages * patchNumber);
};

exports.createChatroomMessage = async function (
  body,
  chatroomParticipantId,
  chatroomId
) {
  return ChatroomMessage.create({ body, chatroomParticipantId, chatroomId });
};
