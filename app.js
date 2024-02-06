//Acá escribimos la ejecución de nuestro servidor
require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();