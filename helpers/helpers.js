const jwt = require('jsonwebtoken')
const Strings = require('../config/strings')
const mail = require('../config/email')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    }, null)
}
