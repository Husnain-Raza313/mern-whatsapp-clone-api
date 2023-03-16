const asyncHandler = require("express-async-handler");
const Chatroom = require("../models/chatroomModel");
const ChatroomParticipant = require("../models/chatroomParticipantModel");
const ChatroomMessage = require("../models/chatroomMessageModel");
const helpers = require("../helpers/helpers");
const ChatroomService = require("../services/chatroomServices");
const ChatroomParticipantService = require("../services/chatroomParticipantServices");

const getChatroomMessages = asyncHandler(async (req, res) => {
  const { chatroomName } = req.query



  const chatroom = await ChatroomService.findChatroom( chatroomName )
  const messages = await ChatroomMessage.find({ chatroomId: chatroom.id})
  const sender = await ChatroomParticipantService.findChatroomParticipant( req.user.id, chatroom.id)
  // helpers.subscribeChatroom(chatroom.id)

  res?.status(200).json({ messages: messages, sender: sender, message: "Messages Fetched"});
});

const createChatroom = asyncHandler(async (req, res) => {
  const { user2, chatroomName } = req.query
  let chatroomParticipant1;
  console.log(req.query)
  let chatroom = await ChatroomService.findChatroom( chatroomName )
  console.log(chatroom)
  if (chatroom){
    res?.status(400).json({ message: "Chatroom is already created" })
  }
  else{
    chatroom = await ChatroomService.createChatroom( chatroomName, req.user.id )
    chatroomParticipant1 = await ChatroomParticipantService.createChatroomParticipant( req.user.id, chatroom.id )
    await ChatroomParticipantService.createChatroomParticipant( user2, chatroom.id )

    // helpers.subscribeChatroom(chatroom.id)

    res?.status(200).json({ chat_room_id: chatroom.id, sender: chatroomParticipant1.id, message: "Chatroom created successfully"});

  }

});

const createMessage = asyncHandler(async (req, res) => {
  const { chatroomName, body } = req.body
  let message;
  const chatroom = await ChatroomService.findChatroom( chatroomName )
  console.log(chatroom.id);
  console.log(req.user.id)
  if(chatroom){
    chatroomParticipant = await ChatroomParticipantService.findChatroomParticipant( req.user.id, chatroom.id )
    console.log(chatroomParticipant)
    message = await ChatroomMessage.create({ body: body, chatroomParticipantId: chatroomParticipant.id, chatroomId: chatroom.id })

    // helpers.broadcastMessage(chatroom.id)

    res?.status(200).json({ body: message, message: "Message created successfully"});
  }
  else{
    res?.status(400).json({ message: "OOPS! Message is not created" })
  }
});
const ChatroomMessages = {
  getChatroomMessages,
  createChatroom,
  createMessage
};
module.exports = ChatroomMessages;
