var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
// display diagnostico page
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM diagnostico inner join mantenimiento on diagnostico.idMantenimientoDiagnostico = mantenimiento.idmantenimiento',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/diagnostico/index.ejs
            res.render('diagnostico',{data:''});   
        } else {
            // render to views/diagnostico/index.ejs
            res.render('diagnostico',{data:rows});
        }
    });
});



// display add diagnostico page
router.get('/add', function(req, res, next) {    
    // render to add.ejsORDER
     dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            res.render('diagnostico/add',{
                dataMan:'',
                idMantenimientoDiagnostico: '',
                repuesto: '',
                diagnostico: ''
            });   
        } else {
            res.render('diagnostico/add',{
                dataMan:rows,
                idMantenimientoDiagnostico: '',
                repuesto: '',
                diagnostico: ''
            });
        }
     });
})

// add a new diagnostico
router.post('/add', function(req, res, next) {    

    let idMantenimientoDiagnostico = req.body.idMantenimientoDiagnostico;
    let repuesto = req.body.repuesto;
    let diagnostico = req.body.diagnostico;
    let errors = false;

    if(repuesto.length === 0 || diagnostico.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('diagnostico/add',{
                    dataMan:'',
                    idMantenimientoDiagnostico: idMantenimientoDiagnostico,
                    repuesto: repuesto,
                    diagnostico: diagnostico
                });   
            } else {
                // render to views/diagnostico/index.ejs
                res.render('diagnostico/add',{
                    dataMan:ManRows,
                    idMantenimientoDiagnostico: idMantenimientoDiagnostico,
                    repuesto: repuesto,
                    diagnostico: diagnostico
                });
            }
     });
    }

    // if no error
    if(!errors) {

        var form_data = {
            idMantenimientoDiagnostico: idMantenimientoDiagnostico,
            repuesto: repuesto,
            diagnostico: diagnostico
        }
        
        // insert query
        dbConn.query('INSERT INTO diagnostico SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
            dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('diagnostico/add',{
                    dataMan:'',
                    idMantenimientoDiagnostico: form_data.idMantenimientoDiagnostico,
                    repuesto: form_data.repuesto,
                    diagnostico: form_data.diagnostico
                });   
            } else {
                // render to views/diagnostico/index.ejs
                res.render('diagnostico/add',{
                    dataMan:ManRows,
                    idMantenimientoDiagnostico: form_data.idMantenimientoDiagnostico,
                    repuesto: form_data.repuesto,
                    diagnostico: form_data.diagnostico
                });
            }
     });
            } else {                
                req.flash('success', 'diagnostico successfully added');
                res.redirect('/diagnostico/');
            }
        })
    }
})

// display edit diagnostico page
router.get('/edit/(:iddiagnostico)', function(req, res, next) {

    let iddiagnostico = req.params.iddiagnostico;
   
    dbConn.query('SELECT * FROM diagnostico WHERE iddiagnostico = ' + iddiagnostico, function(err, rows, fields) {
        if(err) throw err
         
        // if diagnostico not found
        if (rows.length <= 0) {
            req.flash('error', 'diagnostico not found with iddiagnostico = ' + iddiagnostico)
            res.redirect('/diagnostico/')
        }
        // if diagnostico found
        else {
            // render to edit.ejs
            let varRows = rows[0];
            dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
                let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('diagnostico/edit', {
                    title: 'Edit diagnostico',
                    dataMan: '',
                    iddiagnostico: varRows.iddiagnostico,
                    idMantenimientoDiagnostico: varRows.idMantenimientoDiagnostico,
                    repuesto: varRows.repuesto,
                    diagnostico: varRows.diagnostico
            })  
            } else {
                // render to views/diagnostico/index.ejs
                res.render('diagnostico/edit',{
                    title: 'Edit diagnostico', 
                    dataMan:ManRows,
                    iddiagnostico: varRows.iddiagnostico,
                    idMantenimientoDiagnostico: varRows.idMantenimientoDiagnostico,
                    repuesto: varRows.repuesto,
                    diagnostico: varRows.diagnostico
                });
            }
     });

            
        }
    })
})

// update diagnostico data
router.post('/update/:iddiagnostico', function(req, res, next) {

    let iddiagnostico = req.params.iddiagnostico;
    let idMantenimientoDiagnostico = req.body.idMantenimientoDiagnostico;
    let repuesto = req.body.repuesto;
    let diagnostico = req.body.diagnostico;
    let errors = false;

    if(repuesto.length === 0 || diagnostico.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
            let ManRows = rows;
            if(err) {
                req.flash('error', err);
                res.render('diagnostico/edit', {
                    title: 'Edit diagnostico',
                    dataMan: '',
                    idusario: req.params.iddiagnostico,
                    idMantenimientoDiagnostico: idMantenimientoDiagnostico,
                    repuesto: repuesto,
                    diagnostico: diagnostico
            })  
            } else {
                // render to views/diagnostico/index.ejs
                res.render('diagnostico/edit',{
                    title: 'Edit diagnostico', 
                    dataMan:ManRows,
                    idusario: req.params.iddiagnostico,
                    idMantenimientoDiagnostico: idMantenimientoDiagnostico,
                    repuesto: repuesto,
                    diagnostico: diagnostico
                });
            }
     });
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            idMantenimientoDiagnostico: idMantenimientoDiagnostico,
            repuesto: repuesto,
            diagnostico: diagnostico
        }
        // update query
        dbConn.query('UPDATE diagnostico SET ? WHERE iddiagnostico = ' + iddiagnostico, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM mantenimiento WHERE idTipom = 6  ORDER BY idmantenimiento desc',function(err,rows)     {
                    let ManRows = rows;
                    if(err) {
                        req.flash('error', err);
                        res.render('diagnostico/edit', {
                            title: 'Edit diagnostico',
                            dataMan: '',
                            iddiagnostico: req.params.iddiagnostico,
                            idMantenimientoDiagnostico: form_data.idMantenimientoDiagnostico,
                            repuesto: form_data.repuesto,
                            diagnostico: form_data.diagnostico
                         })  
                    } else {
                        // render to views/diagnostico/index.ejs
                        res.render('diagnostico/edit',{
                            title: 'Edit diagnostico', 
                            dataMan:ManRows,
                            iddiagnostico: req.params.iddiagnostico,
                            idMantenimientoDiagnostico: form_data.idMantenimientoDiagnostico,
                            repuesto: form_data.repuesto,
                            diagnostico: form_data.diagnostico
                        });
                    }
                });
            } else {
                req.flash('success', 'diagnostico successfully updated');
                res.redirect('/diagnostico/');
            }
        })
    }
})
   
// delete diagnostico
/*router.get('/delete/(:iddiagnostico)', function(req, res, next) {

    let iddiagnostico = req.params.diagnostico;
     
    dbConn.query('DELETE FROM repuesto WHERE iddiagnostico= ' + iddiagnostico, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to diagnostico page
            res.redirect('/diagnostico')
        } else {
            // set flash message
            req.flash('success', 'diagnostico successfully deleted! iddiagnostico = ' + iddiagnostico)
            // redirect to diagnostico page
            res.redirect('/diagnostico')
        }
    })
})*/


module.exports = router;