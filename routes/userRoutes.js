const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    searchUser
} = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.get('/search', protect, searchUser)
router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router;
