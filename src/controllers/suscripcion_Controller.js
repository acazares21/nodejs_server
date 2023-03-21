'use strict'

const Suscripcion = require('../models/suscripcion_Models');
const SuscripcionDetalle = require('../models/suscripcionDetalle_Models');
const moment = require("moment");

//Función para obtener los campos a partir del id o clave primaria
async function getById(req, res){
	//ID recibido por medio de la URL
	var id = req.params.id
	//Buscar los datos mediante id por medio de findByPK
	const user = await Suscripcion.findByPk(id);
	//Manejo de errores
	if (user === null) {
		console.log('Not found!');
		res.status(500).send({message: "Ha ocurrido un error en el servidor", error: user});
		//res.status(404).send({message: "No se encontraron datos"});
	} else {
		console.log("Es instancia de suscripcion: " + user instanceof Suscripcion); // true
		res.status(200).send({user}); //Mensaje de respuesta con el usuario según el id.
	}
}

//Función para obtener todos los campos
async function getAll(req, res){ //Aquí debe ir la consulta con todos los detalles (función getWholeSubs)
	// Encontrar todos los datos con findAll
	const subs = await Suscripcion.findAll();
	console.log(subs.every(sub => sub instanceof Suscripcion)); // true
	console.log("Todas las suscripciones:", JSON.stringify(subs, null, 2));
	console.log(req.user_id); //Muestra el id del token.
	
	//Mensaje de repuesta con el listado de usuarios.
	res.status(200).send({subs});
}

//Función para guardar los registros
async function save(req, res){ //Aquí van las transacciones
	try{
		await sequelize.transaction(async function (transaction){
			/*
			* AQUÍ VAN TODAS LAS QUERIES A LA DB.
			*/

			//Crea nuevo registro
			const sub = Suscripcion.build({ 
				//ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				precio_mes: req.body.precio_mes,
				precio_anio: req.body.precio_anio,
				proyecto_id: req.body.proyecto_id,
				plan_categoria_id: req.body.plan_categoria_id,
				plan_id: req.body.plan_id,
				cliente_id: req.body.cliente_id,
				usuario_id: req.user_id
			}, { transaction });
			console.log("Es instancia de Suscripcion: " + sub instanceof Suscripcion); // true
			console.log("El ID generado para la suscripcion es: " + sub.id); //Debería mostrar el ID.
			await sub.save(); //Guarda el registro.

			const suscripcionDetalle = req.body.suscripcion_detalle

			for (let item of suscripcionDetalle) {
				console.log(item.nombre);
				console.log(item.descripcion);
				console.log(item.plan_id);
				console.log(item.usuario_id);
				let suscripcion_detalle = SuscripcionDetalle.build({ 
					//ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
					nombre: item.nombre,
					descripcion: item.descripcion,
					plan_id: plan.id,
					usuario_id: req.user_id
				}, {transaction});
				console.log("Es instancia de Suscripcion: " + suscripcion_detalle instanceof PlanDetalle); // true
				console.log("Suscripcion detalle id BUILD: " + suscripcion_detalle.id);
				console.log("Suscripcion detalle plan_id BUILD: " + plan_detalle.plan_id);
				await suscripcion_detalle.save(); //Guarda el registro.
			}
		});
		console.log("¡Transacciones exitosas!");
		
		//Mensaje de respuesta
		res.send({message: "¡Registros guardados satisfactoriamente!"});
	}
	catch(error){
		console.error("ERROR")
	}
	
}

//Función para actualizar los registros
async function update(req, res){ //¿Transacciones aquí?
	//TRANSACCIONES
	try{
		await sequelize.transaction(async function(transaction){
			/*
			* AQUÍ VAN TODAS LAS QUERIES A LA DB.
			*/

			//QUERIES para UPDATE
			//Los campos que se actualizarán tendrán que ser especificados
			await Suscripcion.update({ 
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				precio_mes: req.body.precio_mes,
				precio_anio: req.body.precio_anio,
				fecha_cobro: moment(new Date()).add(-5,"hours").format("YYYY-MM-DD HH:mm:ss"),//Resta 5 horas a la hora local debido a UTC
				usuario_modifica_id: req.user_id, //ID del token decodificado
				fecha_modifica_id: moment(new Date()).add(-5,"hours").format("YYYY-MM-DD HH:mm:ss")//Resta 5 horas a la hora local debido a UTC
				}, {
					//Aquí se especifica el registro de acuerdo a su campo a actualizar
					where: {
						id: req.params.id
					}
			}, { transaction });
		});
		console.log("¡Transacciones exitosas!");
		
		//Mensaje de respuesta
		res.send({
			message: "Datos actualizados de forma exitosa."
		})

	}
	catch(error){
		console.error("ERROR");
	}
	
}

//Función para remover los registros
async function remove(req, res){
	//Los campos que se actualizarán tendrán que ser especificados
	await Suscripcion.update({ 
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

//Función para obtener todos los datos junto a sus detalles
async function getWholeSubs(req, res){
	Suscripcion.hasMany(SuscripcionDetalle);
	SuscripcionDetalle.belongsTo(Suscripcion);
	const subs = await Suscripcion.findAll({ include: SuscripcionDetalle });
	console.log(JSON.stringify(subs, null, 2)); //Respuesta por consola
	res.status(200).send({ subs }) //Mensaje de respuesta
}

module.exports = {
	getById,
	getAll,
	getWholeSubs,
	save,
	update,
	remove
};