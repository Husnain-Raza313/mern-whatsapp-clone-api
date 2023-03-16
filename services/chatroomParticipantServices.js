const ChatroomParticipant = require('../models/chatroomParticipantModel')

exports.findChatroomParticipant = async function ( userId, chatroomId ) {
  return ChatroomParticipant.findOne({ userId, chatroomId })
}

exports.createChatroomParticipant = async function ( userId, chatroomId ) {
  chatroomParticipant = ChatroomParticipant.new({ userId, chatroomId })
  return chatroomParticipant.save()

}
