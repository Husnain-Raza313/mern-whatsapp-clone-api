const asyncHandler = require("express-async-handler");
const Chatroom = require("../models/chatroomModel");
const ChatroomParticipant = require("../models/chatroomParticipantModel");
const ChatroomMessage = require("../models/chatroomMessageModel");
const helpers = require("../helpers/helpers");

const getChatroomMessages = asyncHandler(async (req, res) => {
  const { chatroomName } = req.query

  const chatroom = await Chatroom.findOne({ name: chatroomName })
  const messages = await ChatroomMessage.find({ chatroomId: chatroom.id})
  const sender = await ChatroomParticipant.findOne({ userId: req.user, chatroomId: chatroom.id })
  helpers.subscribeChatroom(chatroom.id)
  
  res?.status(200).json({ messages: messages, sender: sender, message: "Messages Fetched"});
});

const createChatroom = asyncHandler(async (req, res) => {
  const { user2, chatroomName } = req.query
  let chatroomParticipant1;
  console.log(req.query)
  let chatroom = await Chatroom.findOne({ name: chatroomName })
  console.log(chatroom)
  if (chatroom){
    res?.status(400).json({ message: "Chatroom is already created" })
  }
  else{
    chatroom = await Chatroom.create({name: chatroomName, userId: req.user.id})
    chatroomParticipant1 = await ChatroomParticipant.create({ userId: req.user.id, chatroomId: chatroom.id })
    await ChatroomParticipant.create({ userId: user2, chatroomId: chatroom.id })

    // helpers.subscribeChatroom(chatroom.id)

    res?.status(200).json({ chat_room_id: chatroom.id, sender: chatroomParticipant1.id, message: "Chatroom created successfully"});

  }

});

const createMessage = asyncHandler(async (req, res) => {
  const { chatroomName, body } = req.body
  let message;
  const chatroom = await Chatroom.findOne({ name: chatroomName })
  console.log(chatroom.id);
  console.log(req.user.id)
  if(chatroom){
    chatroomParticipant = await ChatroomParticipant.findOne({ userId: req.user.id, chatroomId: chatroom.id})
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
