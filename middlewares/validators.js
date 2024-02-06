const {validationResult} = require('express-validator');
const Client = require("../models/client");
const jwt = require('jsonwebtoken');

const validarDatos = (req,res,next) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
    })
  }

  next();

};

const correoExiste = async (correo) => {
const cliente = await Client.findOne({correo});
if(cliente){
    throw new Error("El correo electrónico ya está en uso")
   }
};



const existeClientePorId = async (id) => {
    const cliente = await Client.findById(id);
    if(!cliente){
        throw new Error('El cliente no existe')
    };
}

const validatorJWT = async(req,res,next) => {

const token = req.header('x-token');

if(!token){
    return res.status(401).json({
        msg:"No existe ningún token en la petición",
    });
}

try {
    
    const {uid} = jwt.verify(token, process.env.SECRETKEY)

    const cliente = await findById(uid);
    if(!cliente){
        return res.status(401).json({
            msg:"El Token que usted ha utilizado no es valido",
        });
    }

    //Verificación para ver si el uid tiene estado true

    if(!cliente.estado){
        return res.status(401).json({
            msg:"El Token no es valido",
        });
    }

    req.cliente = cliente

    next();


} catch (error) {
    console.log(error)
    res.status(401).json({
        msg:"Token no valido",
    })
};

}

module.exports = {
    validarDatos,
    correoExiste,
    existeClientePorId,
    validatorJWT,
}

