//Archivo usuario_Routes.js donde se indican las rutas que usará el usuario
'use strict'

//Importaciones de express y controllers de usuario  
var express = require('express');
var UsuarioController = require('../controllers/usuario_Controller');
var user = require('../controllers/auth')
var api = express.Router();
const auth = require('../middlewares/auth');

//Rutas de Usuario
api.get('/usuarios', auth.isAuth, UsuarioController.getAll);
api.get('/usuarios/:id', auth.isAuth, UsuarioController.getById);
api.post('/usuarios', auth.isAuth, UsuarioController.save);
api.post('/signup', user.signUp);
api.post('/signin', user.signIn);
api.put('/usuarios/:id', auth.isAuth, UsuarioController.update);
api.delete('/usuarios/:id', auth.isAuth, UsuarioController.remove);

module.exports = api;