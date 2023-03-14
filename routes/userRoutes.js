const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    searchUser
} = require('../controllers/userController')

router.get('/search', searchUser)
router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router
