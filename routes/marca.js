var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
    if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('marca',{data:''});   
        } else {
            // render to views/user/index.ejs
            res.render('marca',{data:rows});
        }
        });

    } else {
         res.render('user/login');
    }
    
});

// display add hospital page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('marca/add', {
        nombremar: '',
        pais: ''
    })
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombremar = req.body.nombremar;
    let pais = req.body.pais;
    let errors = false;

    if(nombremar.length === 0 ||pais.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        res.render('marca/add', {
            nombremar: nombremar,
            pais: pais
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombremar: nombremar,
            pais: pais
        }
        
        // insert query
        dbConn.query('INSERT INTO marca SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('marca/add', {
                    nombremar: form_data.nombremar,
                    pais : form_data.pais                  
                })
            } else {                
                req.flash('success', 'Marca successfully added');
                res.redirect('/marca');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idmarca)', function(req, res, next) {

    let idmarca = req.params.idmarca;
   
    dbConn.query('SELECT * FROM marca WHERE idmarca = ' + idmarca, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Marca not found with idmarca = ' + idmarca)
            res.redirect('/marca')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('marca/edit', {
                title: 'Edit marca', 
                idmarca: rows[0].idmarca,
                nombremar: rows[0].nombremar,
                pais : rows[0].pais
            })
        }
    })
})

// update user data
router.post('/update/:idmarca', function(req, res, next) {

    let idmarca = req.params.idmarca;
    let nombremar = req.body.nombremar;
    let pais = req.body.pais;
    let errors = false;

    if(nombremar.length === 0 ||pais.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('marca/edit', {
            idmarca: req.params.idmarca,
            nombremar: nombremar,
            pais : pais
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombremar: nombremar,
            pais : pais
        }
        // update query
        dbConn.query('UPDATE marca SET ? WHERE idmarca = ' + idmarca, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('marca/edit', {
                    idmarca: req.params.idmarca,
                    nombremar: form_data.nombre,
                    pais : form_data.pais,
                })
            } else {
                req.flash('success', 'marca successfully updated');
                res.redirect('/marca');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idmarca)', function(req, res, next) {

    let idmarca = req.params.idmarca;
     
    dbConn.query('DELETE FROM marca WHERE idmarca = ' + idmarca, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/marca')
        } else {
            // set flash message
            req.flash('success', 'Marca successfully deleted! idmarca = ' + idmarca)
            // redirect to user page
            res.redirect('/marca')
        }
    })
})*/


module.exports = router;