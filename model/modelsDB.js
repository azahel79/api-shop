const { DataTypes } = require("sequelize");
const coneccionDB = require("../db/coneccionDB");



const MODEL_USUARIO = coneccionDB.define("usuarios",{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: "id"
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    MODEL_USUARIO
}