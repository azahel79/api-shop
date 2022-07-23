const express = require("express");
const { check } = require("express-validator");
const { register, listUsers, login } = require("../controllers/userControllers");
const { globalValidations, emailExisting } = require("../middlewares/validators");
const router = express.Router();


// OBTENER LISTA DE USUARIOS
router.get("/listUsers",listUsers); 

// NUEVO USUARIO
router.post("/register",[
    check("nombre","nombre min: 4 caracteres").isLength({min: 4}),
    check("email","escribe un email valido").isEmail(),
    check("email").custom(emailExisting),
    check("password","contraseña min: 6 caracteres").isLength({min: 6}),
    globalValidations
],register);


// INICIAR SESION
router.post("/login",[
    check("nombre","nombre min: 4 caracteres").isLength({min: 4}),
    check("email","escribe un email valido").isEmail(),
    check("password","contraseña min: 6 caracteres").isLength({min: 6}),
    globalValidations
],login);


module.exports = router;