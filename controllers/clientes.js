const Client = require("../models/client");
const bcryptjs = require('bcryptjs');



const clientesGet = async (req,res) => {

    
    const { limite = 2, desde = 0 } = req.query;

    const filter = {estado: true};
    
    const [total, clientes] = await Promise.all([ Client.countDocuments(filter),Client.find(filter).skip(Number(desde)).limit(Number(limite)) ])




    res.json({
        msg:"Lista de clientes",
        total,
        clientes,
    });
};



const clientesPost = async (req,res) => {

    const {nombre,correo,contraseña} = req.body;

    const newClient = new Client({nombre,correo,contraseña});

    const salt = bcryptjs.genSaltSync();

    newClient.contraseña = bcryptjs.hashSync(contraseña, salt);
    
    
    await newClient.save();
    
    
    res.json({
    msg:"Cliente agregado a la base de dato con éxito ",
    newClient,
    });
};



const clientesPut = async (req,res) => {


    const { id } = req.params;

    const {_id, contraseña,nombre,   ...resto} = req.body

    if(contraseña){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña,salt)
    }

    const cliente = await Client.findByIdAndUpdate(id,{$set: {resto, nombre:nombre}})

    res.json({
    msg:"Sus datos han sido actualizados con éxito",
    cliente,
    });
};



const clientesDelete = async (req,res) => {

    const {id} = req.params;

    const cliente = await Client.findByIdAndUpdate(id, {estado:false})

    res.json({
    msg:"Cliente eliminado con éxito",
    cliente,
    });
};



module.exports = {
    clientesGet,
    clientesPost,
    clientesPut,
    clientesDelete,
}