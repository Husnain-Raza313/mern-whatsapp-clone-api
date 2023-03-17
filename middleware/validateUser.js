const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const UserService = require("../services/usersServices");
const Strings = require("../config/strings");

const validate = asyncHandler(async (req, res, next) => {
  const { name, username, phoneNumber, password } = req?.body;
  const userExist = await UserService.findOneUser(phoneNumber);
  if (userExist) {
    res?.status(400);
    throw new Error(Strings.userExists);
  }
  try {
    const instance = new User({ name, username, phoneNumber, password });
    await instance.validate();
    next();
  } catch (error) {
    res?.status(400);
    throw new Error(error);
  }
});
module.exports = { validate };
