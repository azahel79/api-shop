// VALIDACIONES GLOBALES

const { validationResult } = require("express-validator");
const modeloUser = require("../model/modeloUser");

const globalValidations = (req,res,next)=>{
  
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(500).json(errors.array());
    }
    next();
}


const emailExisting = async(email = "")=>{
     const existing = await modeloUser.findOne({email});

     if(existing){
       throw new Error("este usuario existe");
     }
}


module.exports = {
    globalValidations,
    emailExisting
}