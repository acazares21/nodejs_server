'use strict'

const services =  require('../services/auth')

function isAuth(req, res, next){
    try{
        if(!req.headers.authorization){
            return res.status(403).send({message:"No tienes autorización."});
        }
        
        const token = req.headers.authorization.split(' ')[1]

        services.decodeToken(token)
        .then(response=>{
            req.user_id = response
            next()
        })
        .catch(response=>{
            res.status(response.status)
        })

    }
    catch (err){
        return res.status(401).send({message: "Ha ocurrido un error", error: err.toString()});
    }


}

module.exports = {isAuth};