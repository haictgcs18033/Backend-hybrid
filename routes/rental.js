const express=require('express')
const { getRental, addRental, updateRental, deleteRental } = require('../Controller/rentalController')
const { requireSignin } = require('../middleware/middleware')
const router=express.Router()
router.get('/getRental',getRental)
router.post('/addRental',requireSignin,addRental)
router.post('/updateRental',updateRental)
router.post('/deleteRental',deleteRental)

module.exports=router