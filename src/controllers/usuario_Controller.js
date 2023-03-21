'use strict'

var Usuario = require('../models/usuario_Models');
const moment = require("moment");

//Función para obtener los campos a partir del id o clave primaria
async function getById(req, res){
	//ID recibido por medio de la URL
	var id = req.params.id
	//Buscar los datos mediante id por medio de findByPK
	const user = await Usuario.findByPk(id);
	//Manejo de errores
	if (user === null) {
		console.log('Not found!');
		res.status(500).send({message: "Ha ocurrido un error en el servidor", error: user});
		//res.status(404).send({message: "No se encontraron datos"});
	} else {
		console.log("Es instancia de usuario: " + user instanceof Usuario); // true
		res.status(200).send({user}); //Mensaje de respuesta con el usuario según el id.
	}
}

//Función para obtener todos los campos
async function getAll(req, res){
	// Encontrar todos los datos con findAll
	const users = await Usuario.findAll();
	console.log(users.every(user => user instanceof Usuario)); // true
	console.log("Todos los usuarios:", JSON.stringify(users, null, 2)); //Muestra usuarios por consola.
	console.log(req.user_id); //Muestra el id del token.
	
	//Mensaje de repuesta con el listado de usuarios.
	res.status(200).send({users});
}

//Función para guardar los registros
async function save(req, res){
	//Crea nuevo registro
	const user = Usuario.build({ 
		//ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
		usuario: req.body.usuario,
		correo: req.body.correo,
		password: req.body.password,
		usuario_id: req.user_id
	});
	console.log("Es instancia de Usuario: " + user instanceof Usuario); // true
	console.log("El ID generado para el usuario es: " + user.id); //Debería mostrar el ID.
	await user.save(); //Guarda el registro.
	res.send({
		message: "¡Registros guardados satisfactoriamente!",
		"ID generado": user.id
	}); //Mensaje de respuesta.
}

//Función para actualizar los registros
async function update(req, res){
	//Los campos que se actualizarán tendrán que ser especificados
	await Usuario.update({ 
		usuario: req.body.usuario, 
		correo: req.body.correo,
		password: req.body.password,
		usuario_modifica_id: req.user_id, //ID del token decodificado
		fecha_modifica_id: moment(new Date()).add(-5,"hours").format("YYYY-MM-DD HH:mm:ss")//Resta 5 horas a la hora local debido a UTC
	}, {
		//Aquí se especifica el registro de acuerdo a su campo a actualizar
		where: {
			id: req.params.id
		}
		}
	);

	//Mensaje de respuesta
	res.send({
		message: "Datos actualizados de forma exitosa."
	})
}

//Función para remover los registros
async function remove(req, res){
	//Los campos que se actualizarán tendrán que ser especificados
	await Usuario.update({ 
		status: "I",
		usuario_elimina_id: req.user_id, //ID del token decodificado
		fecha_elimina_id: moment(new Date()).add(-5,"hours").format("YYYY-MM-DD HH:mm:ss")//Resta 5 horas a la hora local debido a UTC
		}, {
			//Aquí se especifica el registro de acuerdo a su campo a actualizar
			where: {
				id: req.params.id
			}
			}
	);
	
	//Mensaje de respuesta
	res.send({
		message: "Estado establecido a eliminado (I) de forma exitosa."
	})
		
}

//Exportación de los módulos 
module.exports = {
	getById,
	getAll,
	save,
	update,
	remove
};