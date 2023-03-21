'use strict'
//Importación de los modelos
const Plan = require('../models/plan_Models');
const PlanDetalle = require('../models/planDetalle_Models');
const Proyecto = require('../models/proyecto_Models');
const PlanCategoria = require('../models/planCategoria_Models');
//Utils
const moment = require("moment");
//Importación de la conexión a la base de datos
const { sequelize } = require("../dbConnect");

//	***		RELACIONES A UTILIZAR		***
//plan - plan_detalle
Plan.hasMany(PlanDetalle, {as:'detalle'});
PlanDetalle.belongsTo(Plan);
//plan_categoria - plan
PlanCategoria.hasMany(Plan);
Plan.belongsTo(PlanCategoria,{as:'categoria', foreignKey: 'plan_categoria_id'});
//proyecto - plan	
Proyecto.hasMany(Plan);
Plan.belongsTo(Proyecto,{as:'proyecto'});

//Función para obtener los campos a partir del id o clave primaria
async function getById(req, res){
	//ID recibido por medio de la URL
	var id = req.params.id
	//Buscar los datos mediante id por medio de findByPK
	const user = await Plan.findByPk(id, { include:{all:true, nested:true} });
	//Manejo de errores
	if (user === null) {
		console.log('Not found!');
		res.status(500).send({message: "Ha ocurrido un error en el servidor", error: user});
		//res.status(404).send({message: "No se encontraron datos"});
	} else {
		console.log("Es instancia de Plan: " + user instanceof Plan); // true
		res.status(200).send({user}); //Mensaje de respuesta con el usuario según el id.
	}
}

//Función para obtener todos los campos
async function getAll(req, res){
	// Encontrar todos los datos con findAll e incluye sus detalles y proyectos
	const planes = await Plan.findAll({ include:{all:true, nested:true} });
	
	//const planes = await Plan.findAll({ include: {model: PlanDetalle, as: 'detalle'} }); //(SÓLO DETALLES)

	console.log(planes.every(plan => plan instanceof Plan)); // true
	console.log("Todos los planes:", JSON.stringify(planes, null, 2)); //Muestra usuarios por consola.
	console.log(req.user_id); //Muestra el id del token.
	
	//Mensaje de repuesta con el listado de usuarios.
	res.status(200).send({planes});
}

//Función para guardar los registros
async function save(req, res){
	try{
		await sequelize.transaction(async function (transaction){
			/*
			* AQUÍ VAN TODAS LAS QUERIES A LA DB.
			*/

			//Crea nuevo registro PLAN
			const plan = Plan.build({ 
				//ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				precio_mes: req.body.precio_mes,
				precio_anio: req.body.precio_anio,
				proyecto_id: req.body.proyecto_id,
				plan_categoria_id: req.body.plan_categoria_id,
				usuario_id: req.user_id
			}, {transaction});
			console.log("Es instancia de Plan: " + plan instanceof Plan); // true
			console.log("PLAN.ID: " + plan.id); //Debería mostrar el ID.
			await plan.save(); //Guarda el registro.

			const planDetalle = req.body.plan_detalle

			for (let item of planDetalle) {
				console.log(item.nombre);
				console.log(item.descripcion);
				console.log(item.plan_id);
				console.log(item.usuario_id);
				let plan_detalle = PlanDetalle.build({ 
					//ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
					nombre: item.nombre,
					descripcion: item.descripcion,
					plan_id: plan.id,
					usuario_id: req.user_id
				}, {transaction});
				console.log("Es instancia de Suscripcion: " + plan_detalle instanceof PlanDetalle); // true
				console.log("Plan detalle id BUILD: " + plan_detalle.id);
				console.log("Plan detalle plan_id BUILD: " + plan_detalle.plan_id);
				await plan_detalle.save(); //Guarda el registro.
			}
		});
		console.log("¡Transacciones exitosas!");
		
		//Mensaje de respuesta
		res.send({message: "¡Registros guardados satisfactoriamente!"});
	}
	catch(error){
		console.error("ERROR");
	}

}

//Función para actualizar los registros
async function update(req, res){ //¿Aquí van transacciones?
	//TRANSACCIONES
	try{
		await sequelize.transaction(async function(transaction){
			/*
			* AQUÍ VAN TODAS LAS QUERIES A LA DB.
			*/

			//QUERIES para UPDATE
			//Los campos que se actualizarán tendrán que ser especificados
			await Plan.update({ 
				nombre: req.body.nombre,
				descripcion: req.body.descripcion,
				precio_mes: req.body.precio_mes,
				precio_anio: req.body.precio_anio,
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
	await Plan.update({ 
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

module.exports = {
	getById,
	getAll,
	save,
	update,
	remove
};