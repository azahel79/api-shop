const {Sequelize} = require("sequelize");


const coneccionDB = new Sequelize({
     username: "root",
     password: "root",
     dialect: "mysql",
     host: "127.0.0.1",
     port: 3306,
     database: "shop_appi"
})


module.exports = coneccionDB;