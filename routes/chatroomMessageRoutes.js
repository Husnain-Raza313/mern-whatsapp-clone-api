const express = require("express");
const router = express.Router();
const {
  getChatroomMessages,
  createChatroom,
  createMessage,
} = require("../controllers/chatroomMessageController");
const { protect } = require("../middleware/auth");

router.get("/chatroom/messages", protect, getChatroomMessages);
router.get("/chatroom", protect, createChatroom);
router.post("/message", protect, createMessage);

module.exports = router;
