const {Sequelize} = require("sequelize");


const coneccionDB = new Sequelize({
     username: "root",
     password: "root",
     dialect: "mysql",
     host: "localhost",
     database: "shop_appi"
})


module.exports = coneccionDB;