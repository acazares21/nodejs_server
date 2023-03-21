const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de modeloción de los campos de Suscripcion Detalle
const SuscripcionDetalle = sequelize.define('suscripcion_detalle', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        nombre: {type: DataTypes.STRING},
        descripcion: {type: DataTypes.STRING},
        suscripcion_id: {type: DataTypes.UUID},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},   
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina_id: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'suscripcion_detalle',
        underscored: true
    });

module.exports = SuscripcionDetalle;