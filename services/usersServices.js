const User = require('../models/userModel')

exports.searchUser = async function (userPayload, userName) {
  const { name } = userPayload
  return User.find({
      $and: [
          { name: { $ne: userName } },
          {
            name
          }
      ]
  })
}

exports.findOneUser = async function ( phoneNumber ) {
  return User.findOne({ phoneNumber })
}

exports.findAllUsers = async function ( ) {
  return User.find()
}
