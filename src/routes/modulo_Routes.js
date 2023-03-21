'use strict'

//Importaciones de express y controllers de modulo  
var express = require('express');
var ModuloController = require('../controllers/modulo_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Módulos
api.get('/modulos', auth.isAuth, ModuloController.getAll);
api.get('/modulos/:id', auth.isAuth, ModuloController.getById);
api.post('/modulos', auth.isAuth, ModuloController.save);
api.put('/modulos/:id', auth.isAuth, ModuloController.update);
api.delete('/modulos/:id', auth.isAuth, ModuloController.remove);

module.exports = api;