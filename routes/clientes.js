const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

//Aquí están los controladres (la lógica de las rutas)
const {
    clientesGet,
    clientesPost,
    clientesPut,
    clientesDelete,
    newError,
    apiUrl,
} = require("../controllers/clientes");


const {
    validarDatos,
    correoExiste,
    existeClientePorId,
    validatorJWT,
}=  require("../middlewares/validators");

const { iniciarSesion } = require("../controllers/auth");



router.get("/",[
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
], clientesGet);


router.get("/pokemons",[
    check("Conectado con éxito"),
    check("No ha podido conectarse"),
], apiUrl);


router.get("/error", [
    check("Nuevo error, por favor verificar que esté todo correcto")
], newError)


router.post("/",[
    check("contraseña", "La contraseña debe tener mínimo 8 caracteres").isLength({min:8}),
    check("nombre", "El nombre es oblgatorio").not().isEmpty(),
    check("correo").custom(correoExiste),
    check("correo", "El correo es obligatorio").isEmail(),
    check("correo", "El correo no es válido").isEmail(),
    validarDatos,
], clientesPost);



router.post("/iniciarSesion",[
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    validarDatos,
], iniciarSesion);


router.put("/:id",[

    check("id").custom(existeClientePorId),
    check("id", "No es un ID válido").isMongoId(),
    validarDatos,
    validatorJWT,
], clientesPut);      //esta ruta va a estar esperando un id por el ":id"   EJEMPLO:http://localhost:1000/api/usuarios/

router.delete("/:id", [
    check("id", "El ID no es válido").isMongoId(),
    check("id").custom(existeClientePorId),
    validarDatos,
    validatorJWT,
], clientesDelete);


module.exports = router;