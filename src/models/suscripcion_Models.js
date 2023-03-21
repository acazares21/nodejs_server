const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de modeloción de los campos de Usuario 
const Suscripcion = sequelize.define('suscripcion', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        nombre: {type: DataTypes.STRING},
        descripcion: {type: DataTypes.STRING},
        precio_mes: {type: DataTypes.DECIMAL},
        precio_anio: {type: DataTypes.DECIMAL},
        fecha_cobro: {type: DataTypes.DATE},
        proyecto_id: {type: DataTypes.UUID},
        plan_categoria_id: {type: DataTypes.UUID},
        plan_id: {type: DataTypes.UUID},
        cliente_id: {type: DataTypes.UUID},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina_id: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'suscripcion',
        underscored: true

    });

    module.exports = Suscripcion;