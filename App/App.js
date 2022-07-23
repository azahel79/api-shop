

class App{
    constructor(){
          this.express = require("express");
          this.app = this.express();
          this.cors = require("cors");
          this.dotenv = require("dotenv").config();
          this.mongoose = require("mongoose");
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
        this.mongoose.connect(process.env.MONGODB_CNN).then(res=>{
         console.log("se conecto ala base de datos MONGODB");
        }).catch(error=>{
            console.log(error);
            throw new Error("no se conecto ala base de datos de MONGODB");
        })
    }
    servidores(){
         this.app.use("/",require("../router/routeUser"));
         this.app.use("/",require("../router/routerShop"));
    }

    listen(){
        this.app.listen(this.app.get("port"),()=>{
            console.log(`server in port -> http://localhost:${this.app.get("port")}`);
        })
    }
}

module.exports = App