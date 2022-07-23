const express = require("express");
const { listProducts, addProducts } = require("../controllers/ShopControllers");
const {validationToken} = require("../middlewares/validators");
const router = express.Router();


// RUTA PARA VER LA LISRTA DE PRODUCTOS EN VENTA
router.get("/products",listProducts)

// RUTA PARA CREAR PRODUCTOS
router.post("/addProducts",addProducts);


module.exports = router;