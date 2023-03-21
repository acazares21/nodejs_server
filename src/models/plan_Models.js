const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql',
    define: {
        freezeTableName: true
    }
});*/

//Exportación de modeloción de los campos de Plan 
const Plan = sequelize.define('plan', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        nombre: {type: DataTypes.STRING},
        descripcion: {type: DataTypes.STRING},
        precio_mes: {type: DataTypes.DECIMAL},
        precio_anio: {type: DataTypes.DECIMAL},
        proyecto_id: {type: DataTypes.UUID},
        plan_categoria_id: {type: DataTypes.UUID},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},   
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina_id: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'plan',
        freezeTableName: true,
        underscored: true
    });

module.exports = Plan;