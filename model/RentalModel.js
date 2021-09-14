const mongoose=require('mongoose')
const rentalSchema=mongoose.Schema({
    property:{
        type:String,
        required:true
    },
    rooms:{
        type:String,
        required:true
    },
    rentPrice:{
        type:Number,
        required:true
    },
    furnitureType:{
        type:String,
    },
    reporterName:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports=mongoose.model('Rental',rentalSchema)