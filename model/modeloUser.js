const mongoose = require("mongoose");



const MODELO_USUARIO = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})




module.exports = mongoose.model("usuarios",MODELO_USUARIO);