var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
    if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM doctor inner join hospital on doctor.idhospitaldoctor = hospital.idhospital  ORDER BY iddoctor desc',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('doctorA',{data:''});   
            } else {
                // render to views/user/index.ejs
                res.render('doctorA',{data:rows});
                }
            });
    } else {
         res.render('/user/login');
    }
});

// display add hospital page
router.get('/add', function(req, res, next) {  
    dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
            let hospitalRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('doctorA/add', {
                    datahos : '',
                    nombredoctor: '',
                    passworddoctor: '',
                    idhospitaldoctor: '',
                })  
            } else {
                // render to views/user/index.ejs
                res.render('doctorA/add', {
                    datahos : hospitalRows,
                    nombredoctor: '',
                    passworddoctor: '',
                    idhospitaldoctor: '',
                })
            }
    })   
    
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombredoctor = req.body.nombredoctor;
    let passworddoctor = req.body.passworddoctor;
    let idhospitaldoctor = req.body.idhospitaldoctor;
    let errors = false;
        if(nombredoctor.length === 0 || passworddoctor.length === 0) {
            errors = true;

            dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
            let hospitalRows = rows;
            req.flash('error', "Recuerde llenar todos los campos requeridos!");
            if(err) {
                    req.flash('error', err);
                    res.render('doctorA/add', {
                        datahos : '',
                        nombredoctor: nombredoctor,
                        passworddoctor: passworddoctor,
                        idhospitaldoctor: idhospitaldoctor,
                    })  
                } else {
                    // render to views/user/index.ejs
                    res.render('doctorA/add', {
                        datahos : hospitalRows,
                        nombredoctor: nombredoctor,
                        passworddoctor: passworddoctor,
                        idhospitaldoctor: idhospitaldoctor,
                    })
                }
        })
        }
    // if no error
    if(!errors) {
            var form_data = {
                nombredoctor: nombredoctor,
                passworddoctor: passworddoctor,
                idhospitaldoctor : idhospitaldoctor,
            }
            
            // insert query

            dbConn.query('INSERT INTO doctor SET ?', form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err);
                    dbConn.query('SELECT * FROM mantenimiento ORDER BY idhospital desc',function(err,rows){
                        let hospitalRows = rows;
                        if(err) {
                            req.flash('error', err);
                            res.render('doctorA/add', {
                                datahos : '',
                                nombredoctor: form_data.nombredoctor,
                                passworddoctor: form_data.passworddoctor,
                                idhospitaldoctor : form_data.idhospitaldoctor,
                            })  
                        } else {
                                // render to views/user/index.ejs
                                res.render('doctorA/add', {
                                datahos : hospitalRows,
                                nombredoctor: form_data.nombredoctor,
                                passworddoctor: form_data.passworddoctor,
                                idhospitaldoctor : form_data.idhospitaldoctor,
                            })
                        }
                    })
                }else {
                    req.flash('success', 'doctor successfully added');
                    res.redirect('/doctorA');
                }
            })
        
        }
})

// display edit user page
router.get('/edit/(:iddoctor)', function(req, res, next) {

    let iddoctor = req.params.iddoctor;

    dbConn.query('SELECT * FROM doctor WHERE iddoctor = ' + iddoctor, function(err, rows, fields) {
        if(err) throw err
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'doctor not found with iddoctor = ' + iddoctor)
            res.redirect('/doctor')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
            dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
            let hospitalRows = rows;
            if(err) {
                    req.flash('error', err);
                    res.render('doctorA/edit', {
                        datahos : '',
                        iddoctor: varRows.iddoctor,
                        nombredoctor: varRows.nombredoctor,
                        passworddoctor: varRows.passworddoctor,
                        idhospitaldoctor : varRows.idhospitaldoctor,
                    })  
                } else {
                    // render to views/user/index.ejs
                    res.render('doctorA/edit', {
                        datahos : hospitalRows,
                        iddoctor: varRows.iddoctor,
                        nombredoctor: varRows.nombredoctor,
                        passworddoctor: varRows.passworddoctor,
                        idhospitaldoctor : varRows.idhospitaldoctor,
                    })
                }
        })
        }
    })
})

// update user data
router.post('/update/:iddoctor', function(req, res, next) {

    let iddoctor = req.params.iddoctor;
    let nombredoctor = req.body.nombredoctor;
    let passworddoctor = req.body.passworddoctor;
    let idhospitaldoctor = req.body.idhospitaldoctor;
    let errors = false;

    if(nombredoctor.length === 0 || passworddoctor.length === 0){
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                    let hospitalRows = rows;
                    if(err) {
                            req.flash('error', err);
                            res.render('doctorA/edit', {
                                datahos : '',
                                iddoctor: req.params.iddoctor,
                                nombredoctor: nombredoctor,
                                passworddoctor: passworddoctor,
                                idhospitaldoctor: idhospitaldoctor,
                            })  
                        } else {
                            // render to views/user/index.ejs
                            res.render('doctorA/edit', {
                                datahos : hospitalRows,
                                iddoctor: req.params.iddoctor,
                                nombredoctor: nombredoctor,
                                passworddoctor: passworddoctor,
                                idhospitaldoctor: idhospitaldoctor,
                            })
                        }
                })
    }
        // render to add.ejs with flash message
                
    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombredoctor: nombredoctor,
            passworddoctor: passworddoctor,
            idhospitaldoctor : idhospitaldoctor,

        }
        // update query
        dbConn.query('UPDATE doctor SET ? WHERE iddoctor =  ' + iddoctor, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                    let hospitalRows = rows;
                    if(err) {
                            req.flash('error', err);
                            res.render('doctorA/edit', {
                                dataHos : '',
                                iddoctor: req.params.iddoctor,
                                nombredoctor: form_data.nombredoctor,
                                passworddoctor: form_data.passworddoctor,
                                idhospitaldoctor : form_data.idhospitaldoctor,
                            })  
                        } else {
                            // render to views/user/index.ejs
                            res.render('doctorA/edit', {
                                datahos : hospitalRows,
                                iddoctor: req.params.iddoctor,
                                nombredoctor: form_data.nombredoctor,
                                passworddoctor: form_data.passworddoctor,
                                idhospitaldoctor : form_data.idhospitaldoctor,
                            })
                        }
                })
            } else {
                req.flash('success', 'doctor successfully updated');
                res.redirect('/doctorA');
            }
        })
    }
})

module.exports = router;