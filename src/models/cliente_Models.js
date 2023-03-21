const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de modelación de datos de los campos de Módulo 
const Cliente = sequelize.define('cliente', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        code: {type: DataTypes.STRING},
        nombres: {type: DataTypes.STRING},
        apellidos: {type: DataTypes.STRING},
        correo: {type: DataTypes.STRING},
        usuario: {type: DataTypes.STRING},
        dni: {type: DataTypes.STRING},
        proyecto_id: {type: DataTypes.UUID},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'cliente'
    });
module.exports = Cliente;