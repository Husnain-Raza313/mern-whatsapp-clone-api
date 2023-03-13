const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Strings = require('../config/strings')

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, phoneNumber, password } = req?.body
  const userExist = await UserService.findUser(email)
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
          email: user.email,
          token: helpers.generateToken(user._id)
      }
      res?.status(201).json(data, Strings.userCreatedSuccess)
  }
})
