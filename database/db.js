const mongoose = require('mongoose');

const dbConnection = async () => {



    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Base de datos andando correctamente");
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos");
    }
};


module.exports = {dbConnection}