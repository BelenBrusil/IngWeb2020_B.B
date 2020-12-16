var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
      if (req.session && req.session.admin) {
            dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows)     {
    
            if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('categoria',{data:''});   
            } else {
                // render to views/user/index.ejs
                res.render('categoria',{data:rows});
            }
        });
    } else {
         res.render('/user/login');
    }
});

// display add hospital page
router.get('/add', function(req, res, next) {  
      if (req.session && req.session.admin) {
        res.render('categoria/add', {
        nombrecategoria: '',
        descripcion: ''
        })
    } else {
         res.redirect('/user/login');
    } 
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombrecategoria = req.body.nombrecategoria;
    let descripcion = req.body.descripcion;
    let errors = false;

    if(nombrecategoria.length === 0 ||descripcion.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        res.render('categoria/add', {
            nombrecategoria: nombrecategoria,
            descripcion: descripcion
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombrecategoria: nombrecategoria,
            descripcion: descripcion 
        }
        
        // insert query
        dbConn.query('INSERT INTO categoria SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('categoria/add', {
                    nombrecategoria: form_data.nombrecategoria,
                    descripcion: form_data.descripcion,                  
                })
            } else {                
                req.flash('success', 'categoria successfully added');
                res.redirect('/categoria');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idcategoria)', function(req, res, next) {

    let idcategoria = req.params.idcategoria;
   
    dbConn.query('SELECT * FROM categoria WHERE idcategoria = ' + idcategoria, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'categoria not found with idcategoria = ' + idcategoria)
            res.redirect('/categoria')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('categoria/edit', {
                title: 'Edit categoria', 
                idcategoria: rows[0].idcategoria,
                nombrecategoria: rows[0].nombrecategoria,
                descripcion : rows[0].descripcion
            })
        }
    })
})

// update user data
router.post('/update/:idcategoria', function(req, res, next) {

    let idcategoria = req.params.idcategoria;
    let nombrecategoria = req.body.nombrecategoria;
    let descripcion = req.body.descripcion;
    let errors = false;

    if(nombrecategoria.length === 0 ||descripcion.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('categoria/edit', {
            idcategoria: req.params.idcategoria,
            nombrecategoria: nombrecategoria,
            descripcion: descripcion
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombrecategoria: nombrecategoria,
            descripcion: descripcion
        }
        // update query
        dbConn.query('UPDATE categoria SET ? WHERE idcategoria = ' + idcategoria, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('categoria/edit', {
                    idcategoria: req.params.idcategoria,
                    nombrecategoria: form_data.nombrecategoria,
                    descripcion: form_data.descripcion,
                })
            } else {
                req.flash('success', 'categoria successfully updated');
                res.redirect('/categoria');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idcategoria)', function(req, res, next) {

    let idcategoria = req.params.idcategoria;
     
    dbConn.query('DELETE FROM categoria WHERE idcategoria = ' + idcategoria, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/categoria')
        } else {
            // set flash message
            req.flash('success', 'categoria successfully deleted! idcategoria = ' + idcategoria)
            // redirect to user page
            res.redirect('/categoria')
        }
    })
})*/


module.exports = router;