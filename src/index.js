//Archivo index.js donde estrá centralizado el proyecto
'use strict'
//const express = require('express');
const {Sequelize} = require('sequelize')
//Express y puerto donde trabaja el servidor
//const app = express();
const app = require('./app'); 
const PORT = process.env.PORT || 8080;

//Parámetros de conexión a la base de datos
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql',
    define: {
        freezeTableName: true,
        underscored: true
    }
});

//Autenticación y conexión a la base de datos mostrando posibles errores
sequelize.authenticate().then(() => {
   console.log('Conexión establecida exitosamente.');
}).catch((error) => {
   console.error('No se pudo conectar a la base de datos: ', error);
});

//app.use(express.json());
//app.use("/routes", )

//Conexión y mensaje mostrando el puerto donde se ha conectado
app.listen(PORT, () => {
	console.log(`Servidor http corriendo en el PORT ${PORT}`);
});

//Get de prueba a '/' con el mensaje de respuesta
app.get('/', (req, res) => {
	res.send("<h1>Hello World!</h1>");
	console.log('Se recibió una petición get');
});


module.exports = sequelize;