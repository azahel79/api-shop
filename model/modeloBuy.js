const mongoose = require("mongoose");


const  MODELO_COMPRAS = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    genero: {
        type: String,
        trim: true,
        required: true
    },
    talla: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number,
        trim: true,
        required: true
    },
    cantidad: {
        type: Number,
        trim: true,
        required: true,
        default: 1
    },
    usuarioId:{
         type: mongoose.Schema.Types.ObjectId,
         model: "usuarios"
    },
    productoId:{
        type: mongoose.Schema.Types.ObjectId,
        model: "productos"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("compras",MODELO_COMPRAS);