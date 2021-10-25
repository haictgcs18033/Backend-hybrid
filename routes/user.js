const express = require('express')
const router = express.Router()
const { signup, signin, getUserDetail } = require('../Controller/userController')
const { requireSignin } = require('../middleware/middleware')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getUserDetail', requireSignin, getUserDetail)
module.exports = router