const { request,response } = require("express");

exports.listProducts = (req = request,res = response)=>{
   try {
    //   console.log(req.user);
      res.json({msg: "lista de productos"});
   } catch (error) {
       return res.status(500).json({msg: "hubo un error"});
   }
}