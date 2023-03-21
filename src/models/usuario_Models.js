//Model de usuario
const { sequelize } = require("../dbConnect");

const {Sequelize, DataTypes} = require('sequelize')
/*const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql'
});*/

//Exportación de la modeloción de los campos de Usuario 
const Usuario = sequelize.define('usuario', {
        id: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
        usuario: {type: DataTypes.STRING},
        correo: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
        usuario_id: {type: DataTypes.STRING},
        status: {type: DataTypes.ENUM('A','E','I')},
        fecha_ingreso: {type: DataTypes.DATE},
        usuario_modifica_id: { type: DataTypes.UUID },
        fecha_modifica_id: {type: DataTypes.DATE},
        usuario_elimina_id: { type: DataTypes.UUID },
        fecha_elimina: {type: DataTypes.DATE}
    }, {
        timestamps: false,
        tableName: 'usuario'
    });

 module.exports = Usuario;