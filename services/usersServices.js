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
