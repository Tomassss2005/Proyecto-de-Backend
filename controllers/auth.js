const bcryptjs = require('bcryptjs');
const tokenJWT = require("../middlewares/jwt");
const Client = require("../models/client");

const iniciarSesion = async (req,res) => {

    const { correo, contraseña } = req.body;

  
    try {

     //Chequeo si el correo existe
        const cliente = await Client.findOne({ correo });


        //Verficación para corroborar si el correo o la contraseña son correctas
     if(!cliente){
        return res.status(400).json({
            msg:"El correo o la contraseña son incorrectos",
        });
    }


     //Verificación de la contraseña
     const validarContraseña = bcryptjs.compareSync(contraseña, cliente.contraseña);
     if(!validarContraseña){
        return res.status(400).json({
            msg:"La contraseña no es correcta",
        });
     }
       
     
     //Chequeo si el cliente está activo
      if(!cliente.estado){
        return res.status(400).json({
            msg:"Bloqueado por inactividad. Vuelve a intentarlo en unos minutos",
        });
     }


     const token = await tokenJWT(cliente.id);





     res.json({
        msg:"Bienvenido cliente",
        cliente,
        token,
     })




    } catch (error) {
        console.log(error)
    }

}



const SignIn = async (req, res) => {
    
    
    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await ClientfindOne({ correo });


        if(!cliente){
            const data = {
                nombre,
                correo,
                contraseña,
                img,
                google: true,
            };
             new Client(data);
             await cliente.save();
        }

        if(!cliente.estado){
            return res.status(401).json({
                msg:"Has sido bloqueado",
            });
        }

        const token = await tokenJWT(cliente.id);

        res.json({
            msg:"Todo ha salido bien",
            cliente,
            token,
        });

    } catch (error) {
        restart.status(400).json({
            ok:false,
            msg:"No es valido el Token de google",
        });
    }

    const error = (req, res, next) => {
        // Simulamos un error
        const err = new Error('Algo salió mal');
        next(err);
      };


};


module.exports = {iniciarSesion};