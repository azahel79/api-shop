const express = require("express");
const { listProducts } = require("../controllers/ShopControllers");
const {validationToken} = require("../middlewares/validators");
const router = express.Router();


// RUTA PARA VER LA LISRTA DE PRODUCTOS EN VENTA
router.get("/products",validationToken,listProducts)



module.exports = router;