const jwt=require('jsonwebtoken')
exports.requireSignin=(req,res,next)=>{
    if(req.headers.authorization){
        let token=req.headers.authorization.split(" ")[1]
        let user=jwt.verify(token,'alo')
        req.user=user
    }else{
        return res.status(404).json({message:'Please Login again'})
    }   
    next()
}