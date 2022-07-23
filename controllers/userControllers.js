const { hashSync,compareSync } = require("bcryptjs");
const { request,response } = require("express");
const { v4 } = require("uuid");
const modeloUser = require("../model/modeloUser");
const jwt = require("jsonwebtoken");


// CREAR UN NUEVO USUARIO
exports.register = async(req = request,res = response)=>{
       try {
           
          //ENCRIPTAR USUARIO
          req.body.password =   hashSync(req.body.password,9);
          const createUser = new modeloUser(req.body);
          await createUser.save();

            // CREAR TOKEN
       const token =  await jwt.sign({id: createUser._id},process.env.SECRET_KEY,{
          expiresIn: "1h"
        })
        res.json({user: createUser,token})
       } catch (error) {
         console.log(error);
        return res.status(500).json({msg: "hubo un error"});
       }
}

// INICIAR SESION
exports.login = async(req = request,res = response)=>{
   try {
    
    // VERIFICAR SI EXISTE EL USUARIO
    const userExisting = await modeloUser.findOne({email: req.body.email});
    if(!userExisting){
        return res.status(400).json({msg: "este usuario no existe"})
    } 
     // VERIFICAR SI LA CONTRASEÑA COINCIDE CON EL USUARIO
     const validationPassword = compareSync(req.body.password,userExisting.password);
     if(!validationPassword){
         return res.status(400).json({msg: "contraseña incorrecta"});
     }
    
   
     const token =  await jwt.sign({id: userExisting._id},process.env.SECRET_KEY,{
      expiresIn: "1h"
    })

      res.json({user: userExisting,token});
   } catch (error) {
     return res.status(500).json({msg: "hubo un error"});
   }
}


exports.listUsers = async(req = request,res = response)=>{
  try {
      const getUsers = await modeloUser.find();
      res.json({users: getUsers});
  } catch (error) {
    return res.status(500).json({msg: "hubo un error"});
  }
}  