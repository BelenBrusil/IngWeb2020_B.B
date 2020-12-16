var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');

exports.login = async (req, res) => {
    try {

        let usuario = req.body.usuario;
        let password = req.body.password;
        let errors = false;
        if(usuario.length === 0 || password.length === 0 ) {
            errors = true;
            // set flash message
            req.flash('error', "Recuerde llenar todos los campos requeridos!");
            // render to add.ejs with flash message
             return res.status(400).render('user/login', {
                usuario: usuario,
                password: password,
            })
        }
    
        dbConn.query('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [usuario, password], function(err, rows, fields) {
            if(err) throw err
            // if user not found
            if (rows.length <= 0) {
                dbConn.query('SELECT * FROM doctor WHERE nombredoctor = ? AND passworddoctor = ?', [usuario, password], function(err, rows, fields) {
                    if(err) throw err
                    // if user not found
                    if (rows.length <= 0) {
                        req.flash('error', 'Credenciales no validas')
                        return res.status(401).render('user/login')
                    } else{
                        req.session.doctor = true;
                        return res.status(200).render('user/doctor')
                    }
                })
            } else{
                req.session.user = rows[0].idusuario
                let idcargo = rows[0].idcargo;
                if (idcargo == 1){
                    req.session.admin = true;
                    return res.status(200).render('user/admin')
                } else if (idcargo == 2){
                    req.session.tecnico = true;
                    return res.status(200).render('user/tecnico')
                } else if (idcargo == 3){
                    req.session.gerente = true;
                    return res.status(200).render('user/gerente')
                } else {
                    return res.status(401).render('user/login')
                }
            }
         
        })
    }
     catch (error) {
        console.log(error);
    
    }
}

