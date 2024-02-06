const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { SignIn } = require("../controllers/auth");

const {validarDatos} = require("../middlewares/validators");


router.post("/google,",[
    check("id_token", "Se require el id_token").not().isEmpty(),
    validarDatos,
], SignIn);


module.exports = router