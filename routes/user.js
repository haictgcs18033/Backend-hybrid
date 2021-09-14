const express=require('express')
const router=express.Router()
const {signup, signin, getAllUser}=require('../Controller/userController')

router.post('/signup',signup)
router.post('/signin', signin)
router.get('/getAllUser',getAllUser)
module.exports=router