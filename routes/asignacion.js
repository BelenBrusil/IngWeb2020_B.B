var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var session = require('express-session');
//index
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM tecnicomantenimiento inner join mantenimiento on tecnicomantenimiento.idMantenimientoAsignacion = mantenimiento.idmantenimiento inner join usuario on tecnicomantenimiento.idUsuarioAsignacion = usuario.idusuario  ORDER BY idasignacion desc',function(err,rows)     {
 
        if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('asignacion',{data:''});   
            } else {
                // render to views/user/index.ejs
                res.render('asignacion',{data:rows});
            }
    });
});

// display add hospital page
router.get('/add', function(req, res, next) {  
    dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
            let MantenimeintoRows = rows;
        dbConn.query('SELECT * FROM usuario WHERE idcargo= 2',function(err,rows){
            let UsuarioRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('asignacion/add', {
                    dataMan : '',
                    dataUsuario : '',
                    idMantenimientoAsignacion: '',
                    idUsuarioAsignacion: '',
                })  
            } else {
                // render to views/user/index.ejs
                res.render('asignacion/add', {
                    dataMan : MantenimeintoRows,
                    dataUsuario : UsuarioRows,
                    idMantenimientoAsignacion: '',
                    idUsuarioAsignacion: '',
                })
            }
        })
    })   
    
})

// add a new hospital
router.post('/add', function(req, res, next) {    

    let idMantenimientoAsignacion = req.body.idMantenimientoAsignacion;
    let idUsuarioAsignacion = req.body.idUsuarioAsignacion;
    let errors = false;
        dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
            let MantenimeintoRows = rows;
            dbConn.query('SELECT * FROM usuario WHERE idcargo= 2 ',function(err,rows){
                let UsuarioRows = rows;
                if(err) {
                    req.flash('error', err);
                    res.render('asignacion/add', {
                        dataMan : '',
                        dataUsuario : '',
                        idMantenimientoAsignacion: idMantenimientoAsignacion,
                        idUsuarioAsignacion: idUsuarioAsignacion,
                    })  
                } else {
                    // render to views/user/index.ejs
                    res.render('asignacion/add', {
                        dataMan : MantenimeintoRows,
                        dataUsuario : UsuarioRows,
                        idMantenimientoAsignacion: idMantenimientoAsignacion,
                        idUsuarioAsignacion: idUsuarioAsignacion,
                    })
                }
            })
        })
    // if no error
    if(!errors) {

        for(let i=0; i< idUsuarioAsignacion.length; i++ ){
            var form_data = {
                idMantenimientoAsignacion: idMantenimientoAsignacion,
                idUsuarioAsignacion: idUsuarioAsignacion[i]
            }
            
            // insert query

            dbConn.query('INSERT INTO tecnicomantenimiento SET ?', form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err);
                    dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
                        let MantenimeintoRows = rows;
                        dbConn.query('SELECT * FROM usuario WHERE idcargo= 2 ORDER BY idusuario desc',function(err,rows){
                            let UsuarioRows = rows;
                            if(err) {
                                req.flash('error', err);
                                res.render('aignacion/add', {
                                    dataMan : '',
                                    dataUsuario : '',
                                    idMantenimientoAsignacion: form_data.idMantenimientoAsignacion,
                                    idUsuarioAsignacion: form_data.idUsuarioAsignacion,
                                })  
                            } else {
                                // render to views/user/index.ejs
                                res.render('asignacion/add', {
                                    dataMan : MantenimeintoRows,
                                    dataUsuario : UsuarioRows,
                                    idMantenimientoAsignacion: form_data.idMantenimientoAsignacion,
                                    idUsuarioAsignacion: form_data.idUsuarioAsignacion,
                                })
                            }
                            
                        })
                    })
                }
            })
        }
        req.flash('success', 'Asignacion successfully added');
        res.redirect('/asignacion');
    }
})

// display edit user page
router.get('/edit/(:idasignacion)', function(req, res, next) {

    let idasignacion = req.params.idasignacion;
   
    dbConn.query('SELECT * FROM tecnicomantenimiento WHERE idasignacion = ' + idasignacion, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'asignacion not found with idasignacion = ' + idasignacion)
            res.redirect('/asignacion')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
            dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
            let MantenimeintoRows = rows;
            dbConn.query('SELECT * FROM usuario WHERE idcargo= 2 ',function(err,rows){
                let UsuarioRows = rows;
                if(err) {
                    req.flash('error', err);
                    res.render('asignacion/edit', {
                        dataMan : '',
                        dataUsuario : '',
                        idasignacion: varRows.idasignacion,
                        idMantenimientoAsignacion: varRows.idMantenimientoAsignacion,
                    })  
                } else {
                    // render to views/user/index.ejs
                    res.render('asignacion/edit', {
                        dataMan : MantenimeintoRows,
                        dataUsuario : UsuarioRows,
                        idasignacion: varRows.idasignacion,
                        idMantenimientoAsignacion: varRows.idMantenimientoAsignacion,
                    })
                }
            })
        })
        }
    })
})

// update user data
router.post('/update/:idasignacion', function(req, res, next) {

    let idasignacion = req.params.idasignacion;
    let idMantenimientoAsignacion = req.body.idMantenimientoAsignacion;
    let errors = false;
        // render to add.ejs with flash message
                dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
                    let MantenimeintoRows = rows;
                    dbConn.query('SELECT * FROM usuario WHERE idcargo= 2 ',function(err,rows){
                        let UsuarioRows = rows;
                        if(err) {
                            req.flash('error', err);
                            res.render('asignacion/edit', {
                                dataMan : '',
                                dataUsuario : '',
                                idasignacion: req.params.idasignacion,
                                idMantenimientoAsignacion: idMantenimientoAsignacion,
                            })  
                        } else {
                            // render to views/user/index.ejs
                            res.render('asignacion/edit', {
                                dataMan : MantenimeintoRows,
                                idasignacion: req.params.idasignacion,
                                idMantenimientoAsignacion: idMantenimientoAsignacion,
                            })
                        }
                    })
                })
    // if no error
    if( !errors ) {   
 
        var form_data = {
            idMantenimientoAsignacion: idMantenimientoAsignacion,
        }
        // update query
        dbConn.query('UPDATE tecnicomantenimiento SET ? WHERE idasignacion =  ' + idasignacion, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err);
                dbConn.query('SELECT * FROM mantenimiento ORDER BY idmantenimiento desc',function(err,rows){
                    let MantenimeintoRows = rows;
                    dbConn.query('SELECT * FROM usuario WHERE idcargo= 2 ',function(err,rows){
                        let UsuarioRows = rows;
                        if(err) {
                            req.flash('error', err);
                            res.render('asignacion/edit', {
                                dataMan : '',
                                dataUsuario : '',
                                idasignacion: req.params.idasignacion,
                                idMantenimientoAsignacion: form_data.idMantenimientoAsignacion,
                            })  
                        } else {
                            // render to views/user/index.ejs
                            res.render('asignacion/edit', {
                                dataMan : MantenimeintoRows,
                                dataUsuario : UsuarioRows,
                                idasignacion: req.params.idasignacion,
                                idMantenimientoAsignacion: form_data.idMantenimientoAsignacion,
                            })
                        }
                    })
                })
            } else {
                req.flash('success', 'asignacion successfully updated');
                res.redirect('/asignacion');
            }
        })
    }
})
   
// delete user
/*router.get('/delete/(:idasignacion)', function(req, res, next) {

    let idasignacion = req.params.idasignacion;
     
    dbConn.query('DELETE FROM tecnicomantenimiento WHERE idasignacion = ' + idasignacion, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/asignacion')
        } else {
            // set flash message
            req.flash('success', 'asignacion successfully deleted! idasignacion = ' + idasignacion)
            // redirect to user page
            res.redirect('/asignacion')
        }
    })
})*/

module.exports = router;