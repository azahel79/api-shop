const { hashSync } = require("bcryptjs");
const { request,response } = require("express");
const { v4 } = require("uuid");
const { MODEL_USUARIO } = require("../model/modelsDB");

exports.register = async(req = request,res = response)=>{
       try {

          // VERIFICAR SI EL USUARIO EXISTE
          const existingUser = await MODEL_USUARIO.findOne({
              where: {
                  email: req.body.email
              }
          })

          if(existingUser){
             return res.status(400).json({msg: "ya existe este usuario"});
          }

            ///ASIGNAR ID AL USUARIO
            req.body.id =  v4().substring(0,5);
         ////HASHING AL PASSWORD
          req.body.password = hashSync(req.body.password,9);
          const newUser = await MODEL_USUARIO.create(req.body);
          res.json({user: newUser});
       } catch (error) {
        return res.status(500).json({msg: "hubo un error"});
       }
}


exports.listUsers = async(req = request,res = response)=>{
  try {
       const getUsers = await MODEL_USUARIO.findAll();

       res.json({users: getUsers});
  } catch (error) {
    return res.status(500).json({msg: "hubo un error"});
  }
}  