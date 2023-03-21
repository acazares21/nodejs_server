const {Sequelize} = require('sequelize')
const conn = {};
const sequelize = new Sequelize('proyectos','acazares','acazares',{
	host: 'localhost',
	dialect: 'mysql',
   //Opcionales
   define: {
      freezeTableName: true,
      underscored: true
   }
});

sequelize.authenticate().then(() => {
   console.log('Conexión a la base de datos establecida exitosamente.');
}).catch((error) => {
   console.error('No se pudo conectar a la base de datos: ', error);
});

conn.sequelize = sequelize;
conn.Sequelize = Sequelize;

module.exports = conn;