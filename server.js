const express=require('express');
const app=express();
const mongoose=require('mongoose')
const cors=require('cors')
app.use(cors())
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
   ).then(()=>{
    console.log(`Connected to database`);
   }).catch((err)=>{
       console.log(err)
   })
const rentalRoute=require('./routes/rental')
const userRoute=require('./routes/user')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/rental',rentalRoute)
app.use('/user',userRoute)
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})