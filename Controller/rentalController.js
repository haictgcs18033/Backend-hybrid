const Rental=require('../model/RentalModel')
exports.getRental=(req,res)=>{
    Rental.find().exec((err,rental)=>{
        if(err) return res.status(404).json({message:'err'})
        if(rental){
            return res.status(200).json(rental)
        }
    })
}
exports.addRental=(req,res)=>{
    const {property,rent,room,reporter}=req.body
    let rental=new Rental({
        property:property,
        rooms:room,
        rentPrice:rent,
        reporterName:reporter
    })
    rental.save((err,rental)=>{
        if(err) return res.status(400).json({message:err})
        if(rental){
            return res.status(200).json({message:'Add successfully'})
        }
    })
}
exports.updateRental=(req,res)=>{
    const {id,property,rent,room,reporter}=req.body
    if(!id){
        return res.status(404).json({message:'Undefined rental'})
    }
    Rental.updateOne({_id:id},{
        $set:{
            property:property,
            rooms:room,
            rentPrice:rent,
            reporterName:reporter
        }
    }).exec((err,rental)=>{
        if(err) return res.status(404).json({message:err})
        if(rental){
            res.status(200).json({message:'Update Successfully'})
        }
    })
}
exports.deleteRental=(req,res)=>{
    const {id}=req.body
    if(!id){
        return res.status(404).json({message:"Undefined rental"})
    }
    Rental.deleteOne({_id:id}).exec((err,rental)=>{
        if(err) return res.status(404).json({message:err})
        if(rental){
            res.status(200).json({message:'Delete Successfully'})
        }
    })
}