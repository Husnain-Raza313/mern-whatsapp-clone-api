const ChatroomMessage = require("../models/chatroomMessageModel")

exports.findChatroomMessages = async function ( chatroomId ) {
  return chatroomMessage.find({ chatroomId })
}

exports.createChatroomMessage = async function ( body, chatroomParticipantId, chatroomId ) {
  chatroomMessage = ChatroomMessage.new({ body, chatroomParticipantId, chatroomId })
  return chatroomMessage.save()

}
