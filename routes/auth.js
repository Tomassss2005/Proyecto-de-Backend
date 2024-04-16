const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { SignIn } = require("../controllers/auth");

const {validarDatos} = require("../middlewares/validators");

const {iniciarSesion} = require("../controllers/auth");


module.exports = router;