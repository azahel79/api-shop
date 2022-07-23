const { threadId } = require("worker_threads");
const coneccionDB = require("../db/coneccionDB");

class App{
    constructor(){
          this.express = require("express");
          this.app = this.express();
          this.cors = require("cors");
          this.dotenv = require("dotenv").config();
    }

    controllers(){
        this.app.set("port",process.env.PORT);
    }
    middlewares(){
        this.app.use(this.express.json());
        this.app.use(this.express.urlencoded({extended: false}));
        this.app.use(this.cors());
    }
    conectarDB(){
      coneccionDB.authenticate();
      console.log("conectada la base de datos MYSQL");
    }
    servidores(){
         this.app.use("/",require("../router/routeUser"));
    }

    listen(){
        this.app.listen(this.app.get("port"),()=>{
            console.log(`server in port -> http://localhost:${this.app.get("port")}`);
        })
    }
}

module.exports = App