'use strict'

//Importaciones de express y controllers de categorías de plan  
var express = require('express');
var PlanCategoriaController = require('../controllers/planCategoria_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de PlanCategoría
api.get('/categorias', auth.isAuth, PlanCategoriaController.getAll);
api.get('/categorias/:id', auth.isAuth, PlanCategoriaController.getById);
api.post('/categorias', auth.isAuth, PlanCategoriaController.save);
api.put('/categorias/:id', auth.isAuth, PlanCategoriaController.update);
api.delete('/categorias/:id', auth.isAuth, PlanCategoriaController.remove);

module.exports = api;