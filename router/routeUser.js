const express = require("express");
const { check } = require("express-validator");
const { register, listUsers } = require("../controllers/userControllers");
const { globalValidations, emailExisting } = require("../middlewares/validators");
const router = express.Router();



router.get("/listUsers",listUsers);   
router.post("/register",[
    check("nombre","nombre min: 4 caracteres").isLength({min: 4}),
    check("email","escribe un email valido").isEmail(),
    check("email").custom(emailExisting),
    check("password","contraseña min: 6 caracteres").isLength({min: 6}),
    globalValidations
],register);


module.exports = router;