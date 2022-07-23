const { request,response } = require("express");
const modeloProductos = require("../model/modeloProducts");

// CONTROLLERS PARA LISTA DE PRODUCTOS
exports.listProducts = async(req = request,res = response)=>{
  
   try {
      let products;       
     if(!req.query.hasOwnProperty("genre")){
        products = await modeloProductos.find();
        return res.json({products});
     }
  
      products = await modeloProductos.find({genero: req.query.genre});

     return  res.json({products});
       
     



      res.json({msg: "lista de productos"});

     
   } catch (error) {
       return res.status(500).json({msg: "hubo un error"});
   }
}


exports.addProducts = async(req = request,res = response)=>{
   try {
     
      // VERIFICAR SI YA EXISTE ESTE PRODUCTO
       const productExisting = await modeloProductos.find({nombre: req.body.nombre});

      const productValidate =  productExisting.find(product=> product.genero === req.body.genero);   

   
       console.log(productValidate);

        if(productValidate){
            return res.status(400).json({msg: "este producto ya existe"});
        }

      //   if(productExisting.length  < 0){
      //    return res.status(400).json({msg: "este producto ya existe"});
      //   }



        
        


      const newProduct = new modeloProductos(req.body);
      await newProduct.save();
      res.json({product: newProduct});
   } catch (error) {
        return res.status(500).json({msg: "hubo un error"});
   }
}