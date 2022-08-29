const express = require("express");
const { check } = require("express-validator");
const { listProducts, addProducts, buyProduct, deleteBuy, addBuyController, deleteBuyController } = require("../controllers/ShopControllers");
const {validationToken, globalValidations} = require("../middlewares/validators");
const router = express.Router();


// RUTA PARA VER LA LISRTA DE PRODUCTOS EN VENTA
router.get("/products",listProducts)

// RUTA PARA CREAR PRODUCTOS
router.post("/addProducts",addProducts);

// RUTA PARA REALIZAR LA COMPRA DE UN PRODUCTO
router.post("/purchaseProduct/:userId",[
    check("nombre","nombre del producto obligatorio").not().isEmpty(),
    check("precio","precio del producto obligatorio").isNumeric(),
    check("genero","genero obligatorio").not().isEmpty(),
    globalValidations  
],validationToken,buyProduct);

//RUTA PARA ELIMINAR LA COMPRA DE UN PRODUCTO
router.delete("/deletePurchase/:userId",validationToken,deleteBuy);

// RUTA PARA EDITAR LA COMPRA CON EL CONTROLADOR DE AUMENTAR COMPRA
router.put("/purchaseProductController/:userId",validationToken,addBuyController)

// RUTA PARA ELIMINAR UNA COMPRA POR EL CONTROLADOR DE RESTAR COMPRA
router.put("/deletePurchaseController/:userId",validationToken,deleteBuyController);
module.exports = router;