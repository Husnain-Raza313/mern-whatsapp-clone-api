const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Strings = require('../config/strings')
const helpers = require('../helpers/helpers')
const UserService = require('../services/usersServices')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, phoneNumber, password } = req?.body
  const userExist = await User.findOne({ phoneNumber })
  console.log(userExist);
  if (userExist) {
      res?.status(400)
      throw new Error(Strings.userExists)
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const user = await User.create({name,
    username,
    phoneNumber,
    password: hashPassword});
  if (user) {
      const data = {
          _id: user.id,
          name: user.name,
          username: user.username,
      }
      res?.status(201).json(data, Strings.userCreatedSuccess)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {
      phoneNumber,
      password
  } = req?.body
  const user = await User.findOne({ phoneNumber })
  console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
      const data = {
          _id: user.id,
          name: user.name,
          username: user.username,
          phoneNumber: user.phoneNumber,
          token: helpers.generateToken(user._id)
      }
      res?.status(200).json([data, Strings.userLoggedInSuccess])
  }
  else {
      res?.status(400)
      throw new Error('Invalid credentials')
  }
})

const searchUser = asyncHandler(async (req, res) => {

  const usersList = await UserService.searchUser(req?.query, req.user.name)

  res?.status(200).json([usersList, Strings.userFetchSuccessfully])
})

const Users = {
  loginUser,
  registerUser,
  searchUser
}
module.exports = Users
