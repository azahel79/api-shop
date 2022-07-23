const { hashSync } = require("bcryptjs");
const { request,response } = require("express");
const { v4 } = require("uuid");
const modeloUser = require("../model/modeloUser");




exports.register = async(req = request,res = response)=>{
       try {
           
          //ENCRIPTAR USUARIO
          req.body.password =   hashSync(req.body.password,9);
          const createUser = new modeloUser(req.body);
          await createUser.save();
          res.json({user: createUser})
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