// VALIDACIONES GLOBALES

const { response } = require("express");
const { request } = require("express");
const { validationResult } = require("express-validator");
const modeloUser = require("../model/modeloUser");
const jwt = require("jsonwebtoken");

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


const validationToken = (req = request,res = response,next)=>{
      const token = req.header("auth_token");
      if(!token){
        return res.status(500).json({msg: "no existe el token"});
      }

      try {
          const usuario = jwt.verify(token,process.env.SECRET_KEY);
          req.user = usuario.id;
          next();
      } catch (error) {
        return res.status(500).json({msg: "token no valido"});
      }
}


module.exports = {
    globalValidations,
    emailExisting,
    validationToken
}