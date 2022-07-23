const express = require("express");
const { register, listUsers } = require("../controllers/userControllers");
const router = express.Router();



router.get("/",listUsers);
router.post("/register",register);


module.exports = router;