const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de modeloción de los campos de Plan Categoría
const PlanCategoria = sequelize.define('plan_categorias', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        nombre: {type: DataTypes.STRING},
        proyecto_id: {type: DataTypes.UUID},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},   
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina_id: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'plan_categoria',
        freezeTableName: true,
        underscored: true
    });

module.exports = PlanCategoria;