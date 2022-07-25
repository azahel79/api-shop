const express = require("express");
const { check } = require("express-validator");
const { listProducts, addProducts, buyProduct, deleteBuy } = require("../controllers/ShopControllers");
const {validationToken, globalValidations} = require("../middlewares/validators");
const router = express.Router();


// RUTA PARA VER LA LISRTA DE PRODUCTOS EN VENTA
router.get("/products",validationToken,listProducts)

// RUTA PARA CREAR PRODUCTOS
router.post("/addProducts",addProducts);

// RUTA PARA REALIZAR LA COMPRA DE UN PRODUCTO
router.post("/buyProduct/:userId",[
    check("nombre","nombre del producto obligatorio").not().isEmpty(),
    check("precio","precio del producto obligatorio").isNumeric(),
    check("genero","genero obligatorio").not().isEmpty(),
    globalValidations  
],validationToken,buyProduct);

//RUTA PARA ELIMINAR LA COMPRA DE UN PRODUCTO
router.delete("/deleteBuy/:userId",[
    check("nombre","nombre del producto obligatorio").not().isEmpty(),
    check("precio","precio del producto obligatorio").isNumeric(),
    check("genero","genero obligatorio").not().isEmpty(),
],validationToken,deleteBuy);


module.exports = router;