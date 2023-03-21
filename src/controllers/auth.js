'use strict'

const User = require('../models/usuario_Models');
const service = require("../services/auth")

//Registrarse
async function signUp(req, res){
  //Construcción de los campos a enviar
  const user = User.build({
    //ID: No es necesario crearlo, el model se encarga de generar y verificar los duplicados.
    usuario: req.body.usuario,
    correo: req.body.correo,
    password: req.body.password,
    //usuario_id: req.body.usuario_id (No es necesario porque el campo acepta nulos, al registrarse no se almacenará usuario_id).
  })

  await user.save((err)=>{
      if (err) res.status(500).send({message:`Error al crear el usuario: ${err}`})
      return res.status(200).send({token: service.createToken(user)})
  })

  //Respuesta con mensaje
  res.send({
    message: "¡Registrado satisfactoriamente!",
    "ID generado": user.id
  });
}

//Login
async function signIn(req, res){
  try{
    //Búsqueda mediante el correo
    const us = await User.findOne({ where: { correo: req.body.correo, password:req.body.password } });
    console.log(us.usuario)

    if (!us.usuario) {
      console.log('Not found!');
      return res.status(404).send({message: "No existe el usuario o contraseña inválida."})
    } 
    else {
      console.log(us instanceof User); // true
      console.log(us.correo); // Correo
        
      req.us= us

      //Respuesta con mensaje
      res.status(200).send({
        message: "Te has logeado correctamente",
        token: service.createToken(us)
      })
    }
  }catch(error){
    console.log(error);
    res.status(404).send({message: "No existe el usuario o contraseña inválida."})
  }
  
}

module.exports={
    signUp,
    signIn
}