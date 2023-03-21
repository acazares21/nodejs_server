'use strict'

//Importaciones de express y controllers de suscripcion  
var express = require('express');
var SuscripcionController = require('../controllers/suscripcion_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Suscripciones
api.get('/suscripciones', auth.isAuth, SuscripcionController.getAll);
api.get('/todas_subs', auth.isAuth, SuscripcionController.getWholeSubs);
api.get('/suscripciones/:id', auth.isAuth, SuscripcionController.getById);
api.post('/suscripciones', auth.isAuth, SuscripcionController.save);
api.put('/suscripciones/:id', auth.isAuth, SuscripcionController.update);
api.delete('/suscripciones/:id', auth.isAuth, SuscripcionController.remove);

module.exports = api;