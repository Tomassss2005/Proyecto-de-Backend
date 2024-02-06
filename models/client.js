const {Schema, model} = require('mongoose');

const ClientesSchema = Schema({

    nombre:{
        type:String,
        required:[true, 'El nombre es de caracter obligatorio'],
    },
    correo:{
        type:String,
        required:[true, 'El correo es un dato obligatorio'],
        unique:true,
    },
    contraseña:{
        type:String,
        required:[true, 'La contraseña es obligatoria'],
    },
    dirección:{
        type:String,
    },
    actividadprincipal:{
        type:String,
    },
    Numerotel:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    },
});

const Client = model('Client', ClientesSchema);

module.exports = Client;