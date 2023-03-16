const asyncHandler = require("express-async-handler");

const getChatroomMessages = asyncHandler(async (req, res) => {
  const { chatroomName } = req.query

  const chatroom = Chatroom.findOne({ name: chatroomName })
  const messages = ChatroomMessage.find({ chatroomId: chatroom.id})
  const sender = ChatroomParticipant.findOne({ userId: req.query.user, chatroomId: chatroom.id })

  res?.status(200).json({ messages: messages, sender: sender, message: Strings.userFetchSuccessfully});
});

const createChatroom = asyncHandler(async (req, res) => {
  const { user2, chatroomName } = req.query

  const chatroom = Chatroom.findOne({ name: chatroomName })
  if (!chatRoom){

    chatroom = Chatroom.create({name: chatroomName, userId: req.query.user})
    chatroomParticipant1 = ChatroomParticipant.create({ userId: req.query.user, chatroomId: chatRoom.id })
    ChatroomParticipant.create({ userId: user2.id, chatroomId: chatRoom.id })

    res?.status(200).json({ chat_room_id: chatRoom.id, sender: chatroomParticipant1.id, message: Strings.userFetchSuccessfully});
  }
  else{
    // const sender = ChatroomParticipant.findOne({ userId: req.query.user, chatroomId: chatroom.id })
    res?.status(400).json({ message: "Chatroom is already created" })
  }

});

const createMessage = asyncHandler(async (req, res) => {
  const { chatroomName, body } = req.query
  let message;
  const chatroom = Chatroom.findOne({ name: chatroomName })

  if(chatRoom){
    chatroomParticipant = ChatroomParticipant.findOne({ userId: req.query.user, chatroomID: chatroom.id})
    message = ChatroomMessage.create({ body: body, chatroomParticipantId: chatroomParticipant.id, chatroomId: chatroom.id })
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
module.exports = Users;
