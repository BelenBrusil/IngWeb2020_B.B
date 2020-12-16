var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
    if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('tipom',{data:''});   
        } else {
            // render to views/user/index.ejs
            res.render('tipom',{data:rows});
        }
        });

    } else {
         res.redirect('user/login');
    }
});

// display add hospital page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    if (req.session && req.session.admin) {
        res.render('tipom/add', {
        nombretipo: '',
        caracteristica: ''
        })
    } else {
         res.render('user/login');
    }
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombretipo = req.body.nombretipo;
    let caracteristica = req.body.caracteristica;
    let errors = false;

    if(nombretipo.length === 0 ||caracteristica.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        res.render('tipom/add', {
            nombretipo: nombretipo,
            caracteristica: caracteristica
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombretipo: nombretipo,
            caracteristica: caracteristica
        }
        
        // insert query
        dbConn.query('INSERT INTO tipom SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('tipom/add', {
                    nombretipo: form_data.nombretipo,
                    caracteristica : form_data.caracteristica                 
                })
            } else {                
                req.flash('success', 'Tipo successfully added');
                res.redirect('/tipom');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idtipom)', function(req, res, next) {

    let idtipom = req.params.idtipom;
   
    dbConn.query('SELECT * FROM tipom WHERE idtipom = ' + idtipom, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'tipom not found with idtipom = ' + idtipom)
            res.redirect('/tipom')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('tipom/edit', {
                title: 'Edit tipom', 
                idtipom: rows[0].idtipom,
                nombretipo: rows[0].nombretipo,
                caracteristica : rows[0].caracteristica
            })
        }
    })
})

// update user data
router.post('/update/:idtipom', function(req, res, next) {

    let idtipom = req.params.idtipom;
    let nombretipo = req.body.nombretipo;
    let caracteristica = req.body.caracteristica;
    let errors = false;

    if(nombretipo.length === 0 ||caracteristica.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('tipom/edit', {
            idtipom: req.params.idtipom,
            nombretipo: nombretipo,
            caracteristica : caracteristica
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombretipo: nombretipo,
            caracteristica : caracteristica
        }
        // update query
        dbConn.query('UPDATE tipom SET ? WHERE idtipom = ' + idtipom, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('tipom/edit', {
                    idtipom: req.params.idtipom,
                    nombretipo: form_data.nombretipo,
                    caracteristica : form_data.caracteristica,
                })
            } else {
                req.flash('success', 'tipom successfully updated');
                res.redirect('/tipom');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idtipom)', function(req, res, next) {
 
    let idtipom = req.params.idtipom;
     
    dbConn.query('DELETE FROM tipom WHERE idtipom = ' + idtipom, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/tipom')
        } else {
            // set flash message
            req.flash('success', 'tipom successfully deleted! idtipom = ' + idtipom)
            // redirect to user page
            res.redirect('/tipom')
        }
    })
})*/


module.exports = router;