'use strict'

//Importaciones de express y controllers de cliente  
var express = require('express');
var ClienteController = require('../controllers/cliente_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Cliente
api.get('/clientes', auth.isAuth, ClienteController.getAll);
api.get('/clientes/:id', auth.isAuth, ClienteController.getById);
api.post('/clientes', auth.isAuth, ClienteController.save);
api.put('/clientes/:id', auth.isAuth, ClienteController.update);
api.delete('/clientes/:id', auth.isAuth, ClienteController.remove);

module.exports = api;