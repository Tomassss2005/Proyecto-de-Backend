const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../database/db");

class Server{
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";



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
    }

    routes(){
        this.app.use(this.usuariosPath, require("../routes/clientes"));
        this.app.use(this.authPath, require("../routes/clientes"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        })
    }



}

module.exports = Server ;