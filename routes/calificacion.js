var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
router.get('/seleccion', function(req, res, next) {
    dbConn.query('SELECT distinct idMantenimientoAsignacion, nombreman FROM tecnicomantenimiento inner join mantenimiento on tecnicomantenimiento.idMantenimientoAsignacion = mantenimiento.idmantenimiento', function(err, rows, fields) {
        let ManRows = rows;
            if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('calificacion/seleccion',{dataAs:''});   
            } else {
                // render to views/user/index.ejs
                res.render('calificacion/seleccion',{dataAs:rows});
            }
    });
})

router.get('/calificacionesTecnicos/(:idMantenimientoAsignacion)', function(req, res, next) {

    let idMantenimientoAsignacion = req.params.idMantenimientoAsignacion;
    dbConn.query('SELECT idUsuarioAsignacion , usuario, idMantenimientoAsignacion FROM tecnicomantenimiento inner join usuario on idUsuarioAsignacion = idusuario WHERE idMantenimientoAsignacion = ' + idMantenimientoAsignacion, function(err, rows, fields) {
        AsignacionRows = rows;
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Ningun tecnico se ha asignado a ese mantenimeinto ')
            res.redirect('calificacion/seleccion')
        }
        // if user found
        else {
            res.render('calificacion/calificacionesTecnicos',{
                dataAs: AsignacionRows,
                idMantenimientoAsignacion : AsignacionRows.idMantenimientoAsignacion,
                tecnico: '',
                presentacion: '',
                conocimiento: '',
                puntualidad: '',
                comunicacion: '',
                amabilidad: '',
            });
        }
        
    })
})

router.post('/calificacionesTecnicos', function(req, res, next) {    

    let idMantenimientoAsignacion = req.body.idMantenimientoAsignacion;
    let  presentacion= req.body.presentacion;
    let  tecnico= req.body.tecnico;
    let conocimiento = req.body.conocimiento;
    let  puntualidad= req.body.puntualidad;
    let comunicacion = req.body.comunicacion;
    let  amabilidad= req.body.amabilidad;
    let errors = false;

    /*if(comunicacion.length === 0 || puntualidad.length === 0 || amabilidad.length === 0 || conocimiento.length === 0 || presentacion.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        dbConn.query('SELECT idUsuarioAsignacion , usuario, idMantenimientoAsignacion FROM tecnicomantenimiento inner join usuario on idUsuarioAsignacion = idusuario WHERE idMantenimientoAsignacion = ' + idMantenimientoAsignacion, function(err, rows, fields) {
                AsignacionRows = rows;
                if (err) {
                    req.flash('error', err);
                    res.render('calificacion/calificacionesTecnicos',{
                        dataAs: '',
                        idMantenimientoAsignacion: idMantenimientoAsignacion,
                        tecnico: tecnico,
                        presentacion: presentacion,
                        conocimiento: conocimiento,
                        puntualidad: puntualidad,
                        comunicacion: comunicacion,
                        amabilidad: amabilidad
                    });
                }
                // if user found
                else {
                    res.render('calificacion/calificacionesTecnicos',{
                        dataAs: AsignacionRows,
                        idMantenimientoAsignacion: idMantenimientoAsignacion,
                        tecnico: tecnico,
                        presentacion: presentacion,
                        conocimiento: conocimiento,
                        puntualidad: puntualidad,
                        comunicacion: comunicacion,
                        amabilidad: amabilidad
                    });
                }
            })
    }*/
    // if no error
    if(!errors) {
        for(let i=0; i< tecnico.length; i++ ){
            let calificacionTotal = ((parseInt(presentacion[i]) + parseInt(conocimiento[i]) + parseInt(puntualidad[i]) + parseInt(comunicacion[i]) + parseInt(amabilidad[i]))/5);
            var form_data = {
                tecnico: tecnico[i],
                presentacion: presentacion[i],
                conocimiento: conocimiento[i],
                puntualidad: puntualidad[i],
                comunicacion: comunicacion[i],
                amabilidad: amabilidad[i],
                calificacionTotal: calificacionTotal
            }     
            // insert query
            dbConn.query('INSERT INTO calificacion SET ?', form_data, function(err, result) {
                //if(err) throw err
                if (err) {
                    dbConn.query('SELECT idUsuarioAsignacion , usuario, idMantenimientoAsignacion FROM tecnicomantenimiento inner join usuario on idUsuarioAsignacion = idusuario WHERE idMantenimientoAsignacion = ' + idMantenimientoAsignacion, function(err, rows, fields) {
                        AsignacionRows = rows;
                        if (err) {
                            res.render('calificacion/calificacionesTecnicos',{
                                dataAs: '',
                                tecnico: form_data.tecnico,
                                calificacionTotal: form_data.calificacionTotal,
                                presentacion: form_data.presentacion,
                                conocimiento: form_data.conocimiento,
                                puntualidad: form_data.puntualidad,
                                comunicacion: form_data.comunicacion,
                                amabilidad: form_data.amabilidad 
                            });
                        }
                        // if user found
                        else {
                            res.render('calificacion/calificacionesTecnicos',{
                                dataAs: AsignacionRows,
                                tecnico: form_data.tecnico,
                                calificacionTotal: form_data.calificacionTotal,
                                presentacion: form_data.presentacion,
                                conocimiento: form_data.conocimiento,
                                puntualidad: form_data.puntualidad,
                                comunicacion: form_data.comunicacion,
                                amabilidad: form_data.amabilidad  
                            });
                        }
                    }) 
                }
            })
        }
        req.flash('success', 'calificaciones successfully added');
        res.redirect('/calificacion/seleccion');
        
    }
})


module.exports = router;