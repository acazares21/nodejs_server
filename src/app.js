//Archivo app.js donde se cargarán las configuraciones de las rutas 
'use strict'
//Importaciones de express y body-parser
var express = require('express');
var bodyParser = require('body-parser');
//var jwt = require('express-jwt');
var cors = require('cors');
const path = require('path');
var app = express();

//Importación de los archivos de las rutas a utilizar
var usuario_routes = require('./routes/usuario_Routes');
var proyecto_routes = require('./routes/proyecto_Routes');
var modulo_routes = require('./routes/modulo_Routes');
var plan_routes = require('./routes/plan_Routes');
var suscripcion_routes = require('./routes/suscripcion_Routes');
var cliente_routes = require('./routes/cliente_Routes');
var categorias_routes = require('./routes/planCategoria_Routes');
/* --PARA FUTURAS RUTAS--
var _routes = require('./routes/');
var _routes = require('./routes/');
var _routes = require('./routes/');
var _routes = require('./routes/');
*/

//Body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static('public'));

//const secret = {secret: 'secret'};

//app.use(jwt(secret).unless({path: [
	//'/api/suscripcionros/login',
	// '/api/usuario/',
	// /^\/api\/get-image\/.*/,
	// /^\/api\/usuario-image\/.*/,
	// /^\/api\/item-image\/.*/,
	// /^\/api\/restaurante-image\/.*/,
	// /^\/api\/usuario\/telefono\/.*/,
	// /^\/api\/usuario\/correo\/.*/,
	// /^\/api\/enviar-correo\/.*/
//]}));

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//Se cargan las rutas dentro de la instancia de express
app.use('/api', usuario_routes);
app.use('/api', proyecto_routes);
app.use('/api', modulo_routes);
app.use('/api', plan_routes);
app.use('/api', suscripcion_routes);
app.use('/api', cliente_routes);
app.use('/api', categorias_routes);
/* --PARA FUTURAS RUTAS--
app.use('/api', _routes);
app.use('/api', _routes);
app.use('/api', _routes);
app.use('/api', _routes);
*/

app.get('/api/privacy-policy', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).sendFile(path.join(__dirname + '/views/privacy-policy.html'));
})

//Se exporta el módulo de express que contiene las rutas
module.exports = app;