const Chatroom = require('../models/chatroomModel')

exports.findChatroom = async function ( name ) {
  return Chatroom.findOne({ name })
}

exports.createChatroom = async function ( name, userId ) {
  return Chatroom.create({ name, userId })
}
