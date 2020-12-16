var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
    if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('cargos',{data:''});   
            } else {
                // render to views/user/index.ejs
                res.render('cargos',{data:rows});
            }
        });
    } else {
         res.render('user/login');
    }
});

// display add hospital page
router.get('/add', function(req, res, next) {  
      if (req.session && req.session.admin) {
        res.render('cargos/add', {
        nombre: ''
        })
    } else {
         res.redirect('/user/login');
    } 
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombre = req.body.nombre;
    let errors = false;

    if(nombre.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        res.render('cargos/add', {
            nombre: nombre
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombre: nombre
        }
        
        // insert query
        dbConn.query('INSERT INTO cargos SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('cargos/add', {
                    nombre: form_data.nombre                
                })
            } else {                
                req.flash('success', 'cargos successfully added');
                res.redirect('/cargos');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idcargos)', function(req, res, next) {

    let idcargos = req.params.idcargos;
   
    dbConn.query('SELECT * FROM cargos WHERE idcargos = ' + idcargos, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'cargos not found with idcargos = ' + idcargos)
            res.redirect('/cargos')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('cargos/edit', {
                title: 'Edit cargos', 
                idcargos: rows[0].idcargos,
                nombre: rows[0].nombre
            })
        }
    })
})

// update user data
router.post('/update/:idcargos', function(req, res, next) {

    let idcargos = req.params.idcargos;
    let nombre = req.body.nombre;
    let errors = false;

    if(nombre.length === 0)  {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('cargos/edit', {
            idcargos: req.params.idcargos,
            nombre: nombre,
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombre: nombre
        }
        // update query
        dbConn.query('UPDATE cargos SET ? WHERE idcargos = ' + idcargos, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('cargos/edit', {
                    idcargos: req.params.idcargos,
                    nombre: form_data.nombre,
                })
            } else {
                req.flash('success', 'cargos successfully updated');
                res.redirect('/cargos');
            }
        })
    }
})
   
// delete user
router.get('/delete/(:idcargos)', function(req, res, next) {

    let idcargos = req.params.idcargos;
     
    dbConn.query('DELETE FROM cargos WHERE idcargos = ' + idcargos, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/cargos')
        } else {
            // set flash message
            req.flash('success', 'cargos successfully deleted! idcargos = ' + idcargos)
            // redirect to user page
            res.redirect('/cargos')
        }
    })
})


module.exports = router;