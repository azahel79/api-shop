const { request,response } = require("express");
const { bulkWrite } = require("../model/modeloBuy");
const modeloBuy = require("../model/modeloBuy");

const modeloProductos = require("../model/modeloProducts");
const modeloUser = require("../model/modeloUser");

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
   } catch (error) {
       return res.status(500).json({msg: "hubo un error"});
   }
}


exports.addProducts = async(req = request,res = response)=>{
   try {
     
      // VERIFICAR SI YA EXISTE ESTE PRODUCTO
       const productExisting = await modeloProductos.find({nombre: req.body.nombre});

      const productValidate =  productExisting.find(product=> product.genero === req.body.genero);   

        if(productValidate){
            return res.status(400).json({msg: "este producto ya existe"});
        }

       // CREAR UN NUEVO PRODUCTO 
      const newProduct = new modeloProductos(req.body);
      await newProduct.save();
      res.json({product: newProduct});
   } catch (error) {
        return res.status(500).json({msg: "hubo un error"});
   }
}

exports.buyProduct = async(req = request,res = response)=>{
      try {
           const sizes = ["CH","MD","XL"]; 
         
           // VERIFICAR SI EXISTE ESTE MONGO ID
            const userExisting = await modeloUser.findOne({_id: req.params.userId});
         
              
            if(!userExisting){
               return res.status(400).json({msg: "no existe este usuario"});
            }
          
            //VERIFICAR SI EL USUARIO LOGEADO ES EL QUE DESEA HACER LA COMPRA
             if(req.user !== req.params.userId){
                     return res.status(400).json({msg: "no hay permiso"})
             } 

         // VERIFICAR SI EXISTE EL PRODUCT0
         const productExisting = await modeloProductos.find({nombre: req.body.nombre});
          const productValidate =  productExisting.find(product=> product.genero === req.body.genero); 

          if(!productValidate){
              return res.status(400).json({msg: "no existe este producto"})
          }
          // VALIDAR SI EXISTE ESA TALLA
          if(!sizes.includes(req.body.talla)){
              return res.status(400).json({msg: "esta talla no existe"});
          }


          //VERIFICAR SI EXISTE LA COMPRA
           const buyExisiting = await modeloBuy.find({nombre: req.body.nombre});
         if(buyExisiting.length > 0){
            const genreExisting =  buyExisiting.filter(genre=>  genre.genero === req.body.genero);
            
           // VERIFICAR SI EXISTE LA COMPRA POR GENERO
            if(genreExisting.length > 0){                      
                    const sizeExisting = genreExisting.filter(buy=> buy.talla === req.body.talla);
                    // VERIFICAR SI EXISTE LA COMPRA POR GENERO Y LA TALLA
                  if(sizeExisting.length > 0){
                    sizeExisting[0].cantidad = sizeExisting[0].cantidad + 1;
                  //   console.log("talla encontrada",sizeExisting[0]); 
                    await sizeExisting[0].save();   
                    return res.json({msg: "nueva compra mismo genero y misma talla",buy: sizeExisting[0]});              
                  }else{
                     req.body = {...req.body,usuarioId: req.params.userId,productoId: productValidate._id}
      
            
                     const newBuy = new modeloBuy(req.body);
                     await newBuy.save();
                    return  res.json({msg:"compra con mismo genero pero diferente la talla",buy: newBuy}); 
                        
                  }
                  
            }else{
               // SI NO EXISTE ESTE NOMBRE EN LA COMPRA AGREGARLA
               req.body = {...req.body,usuarioId: req.params.userId,productoId: productValidate._id}
            const newBuy = new modeloBuy(req.body);
            await newBuy.save();
           return  res.json({msg:"otra compra por genero diferente",buy: newBuy}); 
               

            }
         }else{
            req.body = {...req.body,usuarioId: req.params.userId,productoId: productValidate._id}
      
            
            const newBuy = new modeloBuy(req.body);
            await newBuy.save();
           return  res.json({msg: "nueva compra",buy: newBuy}); 
         }
      } catch (error) {
         console.log(error);
         return res.status(500).json({msg: "hubo un error"});
      }
}