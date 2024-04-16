const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../database/db");
const error = require("../middlewares/error");

class Server{
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/api/auth";
        this.clientesPath = "/api/clientes";



        //Midllewares
        this.middlewares();


        //Rutas de mi app
        this.routes();


        //Conexión a la base de datos
        this.conectarDB();
    
    
    
    
    }

    async conectarDB(){
        await dbConnection();
    }




    middlewares(){
        this.app.use(express.json());  //Transforma la información de body en json
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(error);
        
        
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.clientesPath, require('../routes/clientes'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        })
    }



}

module.exports = Server ;