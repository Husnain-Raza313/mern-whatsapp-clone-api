const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  searchUser,
  checkUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validateUser");

router.get("/search", protect, searchUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/check", validate, checkUser);

module.exports = router;
