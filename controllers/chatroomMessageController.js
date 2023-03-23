const asyncHandler = require("express-async-handler");
const ChatroomMessage = require("../models/chatroomMessageModel");
const helpers = require("../helpers/helpers");
const Strings = require("../config/strings");
const ChatroomService = require("../services/chatroomServices");
const ChatroomParticipantService = require("../services/chatroomParticipantServices");
const ChatroomMessageService = require("../services/chatroomMessageServices");

const getChatroomMessages = asyncHandler(async (req, res) => {
  const { chatroomName } = req?.query;

  const chatroom = await ChatroomService.findChatroom(chatroomName);
  console.log(chatroom);

  if (!chatroom) {
    res?.status(404);
    throw new Error(Strings.chatroomNotFound);
  }

  const messages = await ChatroomMessageService.findChatroomMessages(
    chatroom.id
  );
  console.log(messages); //messages array can be empty

  const sender = await ChatroomParticipantService.findChatroomParticipant(
    req.user.id,
    chatroom.id
  );
  console.log(sender);

  if (!sender) {
    res?.status(404);
    throw new Error(Strings.userNotFound);
  }

  // for connecting the users to a chat room
  // helpers.subscribeChatroom(chatroom.id)

  res?.status(200).json({
    messages: messages,
    sender: sender,
    message: Strings.messagesFetched,
  });
});

const createChatroom = asyncHandler(async (req, res) => {
  const { user2, chatroomName } = req?.query;

  if (!chatroomName) {
    res?.status(401);
    throw new Error(Strings.invalidChatroomName);
  }
  let chatroom = await ChatroomService.findChatroom(chatroomName);
  console.log(chatroom);

  if (chatroom) {
    res?.status(400).json({ message: Strings.chatroomAlreadyCreated });
  }

  chatroom = await ChatroomService.createChatroom(chatroomName, req.user.id);
  console.log(chatroom);

  if (!chatroom) {
    res?.status(401);
    throw new Error(Strings.chatNotCreated);
  }

  const chatroomParticipant1 =
    await ChatroomParticipantService.createChatroomParticipant(
      req.user.id,
      chatroom.id
    );
  console.log(chatroomParticipant1);

  const chatroomParticipant2 =
    await ChatroomParticipantService.createChatroomParticipant(
      user2,
      chatroom.id
    );
  console.log(chatroomParticipant2);

  if (!chatroomParticipant1 || !chatroomParticipant2) {
    res?.status(401);
    throw new Error(Strings.chatNotCreated);
  }
  // for connecting the users to a chat room
  // helpers.subscribeChatroom(chatroom.id)

  res?.status(200).json({
    chat_room_id: chatroom.id,
    sender: chatroomParticipant1.id,
    message: Strings.chatroomCreatedSuccessfully,
  });
});

const createMessage = asyncHandler(async (req, res) => {
  const { chatroomName, body } = req.body;

  if (!chatroomName || !body) {
    res?.status(401);
    throw new Error(Strings.invalidInput);
  }
  const chatroom = await ChatroomService.findChatroom(chatroomName);
  console.log(chatroom);

  if (!chatroom) {
    res?.status(404);
    throw new Error(Strings.chatroomNotFound);
  }

  const chatroomParticipant =
    await ChatroomParticipantService.findChatroomParticipant(
      req.user.id,
      chatroom.id
    );
  console.log(chatroomParticipant);

  if (!chatroomParticipant) {
    res?.status(401);
    throw new Error(Strings.participantNotFound);
  }
  const messageObject = await ChatroomMessageService.createChatroomMessage(
    body,
    chatroomParticipant.id,
    chatroom.id
  );
  console.log(messageObject);

  if (!messageObject) {
    res?.status(401);
    throw new Error(Strings.messageNotCreated);
  }
  // for broadcasting a message to a chatroom in real-time
  // helpers.broadcastMessage(chatroom.id)

  res
    ?.status(200)
    .json({ body: messageObject, message: Strings.messageCreatedSuccessfully });
});
const ChatroomMessages = {
  getChatroomMessages,
  createChatroom,
  createMessage,
};
module.exports = ChatroomMessages;
