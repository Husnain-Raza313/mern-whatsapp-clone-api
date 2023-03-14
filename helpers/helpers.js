const jwt = require('jsonwebtoken')
const Strings = require('../config/strings')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    }, null)
}
module.exports = {
    generateToken
}
