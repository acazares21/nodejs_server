//Importar el módulo crypto
const crypto = require('crypto');
var Usuario = require('../models/usuario_Models');

const uuidGEN = async (req, res, next) => {
    let uuid
    let user
    while (user == uuid) {
        uuid = crypto.randomUUID();
        user = await Usuario.findByPk(crypto.randomUUID());
    }

    next()

    return uuid

}

module.exports= {uuidGEN};