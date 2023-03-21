'use strict'

//Importaciones de express y controllers de proyecto  
var express = require('express');
var ProyectoController = require('../controllers/proyecto_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Proyecto
api.get('/proyectos', auth.isAuth, ProyectoController.getAll);
api.get('/proyectos/:id', auth.isAuth, ProyectoController.getById);
api.post('/proyectos', auth.isAuth, ProyectoController.save);
api.put('/proyectos/:id', auth.isAuth, ProyectoController.update);
api.delete('/proyectos/:id', auth.isAuth, ProyectoController.remove);

module.exports = api;