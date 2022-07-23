const mongoose = require("mongoose");



const MODELO_PRODUCTOS = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    genero: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number,
        trim: true,
        required: true
    },
   
    
    createdAt: {
       type: Date,
       default: Date.now
    }
})


module.exports = mongoose.model("productos",MODELO_PRODUCTOS);