'use strict'

//Importaciones de express y controllers de plan  
var express = require('express');
var PlanController = require('../controllers/plan_Controller');
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Plan
api.get('/planes', auth.isAuth, PlanController.getAll);
api.get('/planes/:id', auth.isAuth, PlanController.getById);
api.post('/planes', auth.isAuth, PlanController.save);
api.put('/planes/:id', auth.isAuth, PlanController.update);
api.delete('/planes/:id', auth.isAuth, PlanController.remove);

module.exports = api;