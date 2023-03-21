const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')

/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de la modeloción de los campos de Módulo 
const Modulo = sequelize.define('modulo', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        nombre: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING},
        is_activo: {type: DataTypes.TINYINT},
        usuario_id: {type: DataTypes.UUID},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'modulo'
    });

module.exports = Modulo;