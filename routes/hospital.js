var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');

router.get('/user/admin', function(req, res, next) {
      
      res.redirect('/user/admin');

});
//index
router.get('/', function(req, res, next) {
    if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('hospital',{data:''});   
        } else {
            // render to views/user/index.ejs
            res.render('hospital',{data:rows});
        }
        });

    } else {
         res.render('user/login');
    }
});

// display add hospital page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    if (req.session && req.session.admin) {
        res.render('hospital/add', {
        nombrehos: '',
        numeroAreas: ''
        })

    } else {
         res.render('user/login');
    }
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombrehos = req.body.nombrehos;
    let numeroAreas = req.body.numeroAreas;
    let errors = false;

    if(nombrehos.length === 0 ||numeroAreas.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        res.render('hospital/add', {
            nombrehos: nombrehos,
            numeroAreas: numeroAreas
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombrehos: nombrehos,
            numeroAreas: numeroAreas 
        }
        
        // insert query
        dbConn.query('INSERT INTO hospital SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('hospital/add', {
                    nombrehos: form_data.nombrehos,
                    numeroAreas: form_data.numeroAreas,                  
                })
            } else {                
                req.flash('success', 'Hospital successfully added');
                res.redirect('/hospital');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idhospital)', function(req, res, next) {

    let idhospital = req.params.idhospital;
   
    dbConn.query('SELECT * FROM hospital WHERE idhospital = ' + idhospital, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Hospital not found with idhospital = ' + idhospital)
            res.redirect('/hospital')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('hospital/edit', {
                title: 'Edit hospital', 
                idhospital: rows[0].idhospital,
                nombrehos: rows[0].nombrehos,
                numeroAreas : rows[0].numeroAreas
            })
        }
    })
})

// update user data
router.post('/update/:idhospital', function(req, res, next) {

    let idhospital = req.params.idhospital;
    let nombrehos = req.body.nombrehos;
    let numeroAreas = req.body.numeroAreas;
    let errors = false;

    if(nombrehos.length === 0 ||numeroAreas.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('hospital/edit', {
            idhospital: req.params.idhospital,
            nombrehos: nombrehos,
            numeroAreas: numeroAreas
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombrehos: nombrehos,
            numeroAreas: numeroAreas
        }
        // update query
        dbConn.query('UPDATE hospital SET ? WHERE idhospital = ' + idhospital, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('hospital/edit', {
                    idhospital: req.params.idhospital,
                    nombrehos: form_data.nombrehos,
                    numeroAreas: form_data.numeroAreas,
                })
            } else {
                req.flash('success', 'hospital successfully updated');
                res.redirect('/hospital');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idhospital)', function(req, res, next) {

    let idhospital = req.params.idhospital;
     
    dbConn.query('DELETE FROM hospital WHERE idhospital = ' + idhospital, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/hospital')
        } else {
            // set flash message
            req.flash('success', 'Hospital successfully deleted! IDHOSPITAL = ' + idhospital)
            // redirect to user page
            res.redirect('/hospital')
        }
    })
})*/


module.exports = router;