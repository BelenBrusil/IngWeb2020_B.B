var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
// display comentarios page
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM comentarios inner join mantenimiento on comentarios.idMantenimiento = mantenimiento.idmantenimiento',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/comentario/index.ejs
            res.render('comentario',{data:''});   
        } else {
            // render to views/comentario/index.ejs
            res.render('comentario',{data:rows});
        }
    });
});
// display add comentario page
router.get('/add', function(req, res, next) {    
    // render to add.ejsORDER
     dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            res.render('comentario/add',{
                dataMan:'',
                idMantenimiento: '',
                contenido: ''
            });   
        } else {
            res.render('comentario/add',{
                dataMan:rows,
                idMantenimiento: '',
                contenido: ''
            });
        }
     });
})

// add a new comentario
router.post('/add', function(req, res, next) {    

    let idMantenimiento = req.body.idMantenimiento;
    let contenido = req.body.contenido;
    let errors = false;

    if(contenido.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('comentario/add',{
                    dataMan:'',
                    idMantenimiento: idMantenimiento,
                    contenido : contenido
                });   
            } else {
                // render to views/comentario/index.ejs
                res.render('comentario/add',{
                    dataMan:ManRows,
                    idMantenimiento: idMantenimiento,
                    contenido : contenido
                });
            }
     });
    }

    // if no error
    if(!errors) {

        var form_data = {
            idMantenimiento: idMantenimiento,
            contenido : contenido
        }
        
        // insert query
        dbConn.query('INSERT INTO comentarios SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
            dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('comentario/add',{
                    dataMan:'',
                    idMantenimiento: form_data.idMantenimiento,
                    contenido: form_data.contenido
                });   
            } else {
                // render to views/comentario/index.ejs
                res.render('comentario/add',{
                    dataMan:ManRows,
                    idMantenimiento: form_data.idMantenimiento,
                    contenido: form_data.contenido
                });
            }
     });
            } else {                
                req.flash('success', 'comentario successfully added');
                res.redirect('/user/doctor');
            }
        })
    }
})

// display edit comentario page
router.get('/edit/(:idcometario)', function(req, res, next) {

    let idcometario = req.params.idcometario;
   
    dbConn.query('SELECT * FROM comentario WHERE idcomentario = ' + idcomentario, function(err, rows, fields) {
        if(err) throw err
         
        // if comentario not found
        if (rows.length <= 0) {
            req.flash('error', 'comentario not found with idcomentario = ' + idcomentario)
            res.redirect('/comentario/')
        }
        // if comentario found
        else {
            // render to edit.ejs
            let varRows = rows[0];
            dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
                let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('comentario/edit', {
                    title: 'Edit comentario',
                    dataMan: '',
                    idcomentario: varRows.idcomentario,
                    idMantenimiento: varRows.idMantenimiento,
                    contenido: varRows.contenido
            })  
            } else {
                // render to views/comentario/index.ejs
                res.render('comentario/edit',{
                    title: 'Edit comentario', 
                    dataMan:ManRows,
                    idcomentario: varRows.idcomentario,
                    idMantenimiento: varRows.idMantenimiento,
                    contenido: varRows.contenido
                });
            }
     });

            
        }
    })
})

// update comentario data
router.post('/update/:idcomentario', function(req, res, next) {

    let idcomentario = req.params.idcomentario;
    let idMantenimiento = req.body.idMantenimiento;
    let contenido = req.body.contenido
    let errors = false;

    if(contenido.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('comentario/edit', {
                    title: 'Edit comentario',
                    dataMan: '',
                    idusario: req.params.idcomentario,
                    idMantenimiento: idMantenimiento,
                    contenido: contenido
            })  
            } else {
                // render to views/comentario/index.ejs
                res.render('comentario/edit',{
                    title: 'Edit comentario', 
                    dataMan:ManRows,
                    idusario: req.params.idcomentario,
                    idMantenimiento: idMantenimiento,
                    contenido: contenido
                });
            }
     });
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            idMantenimiento: idMantenimiento,
            contenido: contenido
        }
        // update query
        dbConn.query('UPDATE comentario SET ? WHERE idcomentario = ' + idcomentario, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM mantenimiento WHERE estadoD = "Rechazado"  OR  estadoD = "Aprobado"  ORDER BY idmantenimiento desc',function(err,rows)     {
                    let ManRows = rows;
                    if(err) {
                        req.flash('error', err);
                        res.render('comentario/edit', {
                            title: 'Edit comentario',
                            dataMan: '',
                            idcomentario: req.params.idcomentario,
                            idMantenimiento: form_data.idMantenimiento,
                            contenido: form_data.contenido
                         })  
                    } else {
                        // render to views/comentario/index.ejs
                        res.render('comentario/edit',{
                            title: 'Edit comentario', 
                            dataMan:ManRows,
                            idcomentario: req.params.idcomentario,
                            idMantenimiento: form_data.idMantenimiento,
                            contenido: form_data.contenido
                        });
                    }
                });
            } else {
                req.flash('success', 'comentario successfully updated');
                res.redirect('/comentario/');
            }
        })
    }
})

// Cambair estado del comentario
router.get('/estadoC/(:idcomentario)', function(req, res, next) {

    let idcomentario = req.params.idcomentario;
   
    dbConn.query('SELECT * FROM comentarios WHERE idcomentario = ' + idcomentario, function(err, rows, fields) {
        if(err) throw err
         
        // if comentario not found
        if (rows.length <= 0) {
            req.flash('error', 'comentario not found with idcomentario = ' + idcomentario)
            res.redirect('/comentario/')
        }
        // if comentario found
        else {
            res.render('comentario/estadoC', {
                title: 'Hacer visible un comentario', 
                idcomentario: rows[0].idcomentario,
                estadoComentario: rows[0].estadoComentario
            });
        }
    })
})

// Cambiar estado del comentario
router.post('/estadoC/:idcomentario', function(req, res, next) {

    let idcomentario = req.params.idcomentario;
    let estadoComentario = req.body.estadoComentario;
    let errors = false;

    if(estadoComentario.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        res.render('comentario/estadoC', {
            idcomentario: req.params.idcomentario,
            estadoComentario: estadoComentario
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            estadoComentario: estadoComentario
        }
        // update query
        dbConn.query('UPDATE comentarios SET ? WHERE idcomentario = ' + idcomentario, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('comentario/estadoC', {
                    idcomentario: req.params.idcomentario,
                    estadoComentario: form_data.estadoComentario
                })
            } else {
                req.flash('success', 'comentarios successfully updated');
                res.redirect('/comentario');
            }
        })
    }
})

router.get('/listaGerente', function(req, res, next) {
    dbConn.query('SELECT * FROM comentarios inner join mantenimiento on comentarios.idMantenimiento = mantenimiento.idmantenimiento inner join doctor on mantenimiento.idDoctor = doctor.iddoctor WHERE estadoComentario = "Visible"',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/comentario/index.ejs
            res.render('comentario/listaGerente',{data:''});   
        } else {
            // render to views/comentario/index.ejs
            res.render('comentario/listaGerente',{data:rows});
        }
    });
});

   
// delete comentario
/*router.get('/delete/(:idcomentario)', function(req, res, next) {

    let idcomentario = req.params.comentario;
     
    dbConn.query('DELETE FROM contenido WHERE idcomentario= ' + idcomentario, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to comentario page
            res.redirect('/comentario')
        } else {
            // set flash message
            req.flash('success', 'comentario successfully deleted! idcomentario = ' + idcomentario)
            // redirect to comentario page
            res.redirect('/comentario')
        }
    })
})*/


module.exports = router;