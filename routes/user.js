var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {

    res.render('user');

});

router.get('/login', function(req, res, next) {
        res.render('user/login', {
        usuario: '',
        password: '',
    })
    
});
router.get('/admin', function(req, res, next) {
    if (req.session && req.session.admin) {
        res.render('user/admin');
    } else {
         res.redirect('/user/login');
    }
});

router.get('/tecnico', function(req, res, next) {
    if (req.session && req.session.tecnico) {
        res.render('user/tecnico');
    } else {
         res.redirect('/user/login');
    }
});

router.get('/gerente', function(req, res, next) {
      
    res.render('user/gerente');
});

router.get('/doctor', function(req, res, next) {

    res.render('user/doctor');

});
 
 
// display user page
router.get('/list', function(req, res, next) {
     if (req.session && req.session.admin) {
        dbConn.query('SELECT * FROM usuario inner join cargos on usuario.idcargo = cargos.idcargos',function(err,rows)     {
 
            if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('user/list',{data:''});   
            } else {
                // render to views/user/index.ejs
                res.render('user/list',{data:rows});
            }
        });
    } else {
         res.redirect('/user/login');
    }  
});



// display add user page
router.get('/add', function(req, res, next) {    
    // render to add.ejsORDER
     dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            res.render('user/add',{
                data:'',
                nombres: '',
                usuario: '',
                password: '',
                cargo:''
            });   
        } else {
            res.render('user/add',{
                data:rows,
                nombres: '',
                usuario: '',
                password: '',
                cargo:''
            });
        }
     });
})

// add a new user
router.post('/add', function(req, res, next) {    

    let nombres = req.body.nombres;
    let usuario = req.body.usuario;
    let password = req.body.password;
    let cargo = req.body.cargo;
    let errors = false;

    if(nombres.length === 0 ||usuario.length === 0 || password.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                res.render('user/add',{
                    data:'',
                    nombres: nombres,
                    usuario: usuario,
                    password: password,
                    cargo: cargo
                });   
            } else {
                // render to views/user/index.ejs
                res.render('user/add',{
                    data:rows,
                    nombres: nombres,
                    usuario: usuario,
                    password: password,
                    cargo: cargo
                });
            }
     });
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombres: nombres,
            usuario: usuario,
            password: password,
            idcargo: cargo 
        }
        
        // insert query
        dbConn.query('INSERT INTO usuario SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
            dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                res.render('user/add',{
                    data:'',
                    nombres: form_data.nombres,
                    usuario: form_data.usuario,
                    password: form_data.password,
                    cargo: form_data.cargo,  
                });   
            } else {
                // render to views/user/index.ejs
                res.render('user/add',{
                    data:rows,
                    nombres: form_data.nombres,
                    usuario: form_data.usuario,
                    password: form_data.password,
                    cargo: form_data.cargo,  
                });
            }
     });
            } else {                
                req.flash('success', 'User successfully added');
                res.redirect('/user/list');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idusuario)', function(req, res, next) {
    let idusuario = req.params.idusuario;
   
    dbConn.query('SELECT * FROM usuario WHERE idusuario = ' + idusuario, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with idusuario = ' + idusuario)
            res.redirect('/user/list')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
            dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                res.render('user/edit', {
                    title: 'Edit User',
                    data: '',
                    idusuario: varRows.idusuario,
                    nombres: varRows.nombres,
                    usuario: varRows.usuario,
                    password: varRows.password,
                    idcargo: varRows.idcargo
            })  
            } else {
                // render to views/user/index.ejs
                res.render('user/edit',{
                    title: 'Edit User', 
                    data:rows,
                    idusuario: varRows.idusuario,
                    nombres: varRows.nombres,
                    usuario: varRows.usuario,
                    password: varRows.password,
                    idcargo: varRows.idcargo 
                });
            }
     });

            
        }
    })
})

// update user data
router.post('/update/:idusuario', function(req, res, next) {

    let idusuario = req.params.idusuario;
    let nombres = req.body.nombres;
    let usuario = req.body.usuario;
    let password = req.body.password;
    let cargo = req.body.cargo;
    let errors = false;

    if(nombres.length === 0 ||usuario.length === 0 || password.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
            if(err) {
                req.flash('error', err);
                res.render('user/edit', {
                    title: 'Edit User',
                    data: '',
                    idusario: req.params.idusuario,
                    nombres: nombres,
                    usuario: usuario,
                    password: password,
                    cargo: cargo 
            })  
            } else {
                // render to views/user/index.ejs
                res.render('user/edit',{
                    title: 'Edit User', 
                    data:rows,
                    idusario: req.params.idusuario,
                    nombres: nombres,
                    usuario: usuario,
                    password: password,
                    cargo: cargo  
                });
            }
     });
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombres: nombres,
            usuario: usuario,
            password: password,
            idcargo: cargo
        }
        // update query
        dbConn.query('UPDATE usuario SET ? WHERE idusuario = ' + idusuario, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM cargos ORDER BY idcargos desc',function(err,rows)     {
                    if(err) {
                        req.flash('error', err);
                        res.render('user/edit', {
                            title: 'Edit User',
                            data: '',
                            idusuario: req.params.idusuario,
                            nombres: form_data.nombres,
                            usuario: form_data.usuario,
                            password: form_data.password,
                            cargo: form_data.cargo
                         })  
                    } else {
                        // render to views/user/index.ejs
                        res.render('user/edit',{
                            title: 'Edit User', 
                            data:rows,
                            idusuario: req.params.idusuario,
                            nombres: form_data.nombres,
                            usuario: form_data.usuario,
                            password: form_data.password,
                            cargo: form_data.cargo
                        });
                    }
                });
            } else {
                req.flash('success', 'User successfully updated');
                res.redirect('/user/list');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idusuario)', function(req, res, next) {

    let idusuario = req.params.idusuario;
     
    dbConn.query('DELETE FROM usuario WHERE idusuario= ' + idusuario, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/user')
        } else {
            // set flash message
            req.flash('success', 'User successfully deleted! idusuario = ' + idusuario)
            // redirect to user page
            res.redirect('/user')
        }
    })
})*/


module.exports = router;