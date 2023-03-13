const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Strings = require('../config/strings')
const helpers = require('../helpers/helpers')

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, phoneNumber, password } = req?.body
  const userExist = await UserService.findOne({ phoneNumber })
  if (userExist) {
      res?.status(400)
      throw new Error(Strings.userExists)
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const user = await User.create({name,
    username,
    email,
    phoneNumber,
    password: hashPassword});
  if (user) {
      const data = {
          _id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,

      }
      res?.status(201).json(data, Strings.userCreatedSuccess)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {
      phoneNumber,
      password
  } = req?.body

  const user = User.findOne({ phoneNumber })
  if (user && (await bcrypt.compare(password, user.password))) {
      const data = {
          _id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: helpers.generateToken(user._id)
      }
      res?.status(201).json(data, Strings.userLoggedInSuccess)
  }
  else {
      res?.status(400)
      throw new Error('Invalid credentials')
  }
})
