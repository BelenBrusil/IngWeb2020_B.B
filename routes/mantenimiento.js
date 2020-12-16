var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

//index
router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM mantenimiento inner join categoria on mantenimiento.idCategoria = categoria.idcategoria inner join hospital on mantenimiento.idHospital = hospital.idhospital inner join marca on mantenimiento.idMarca = marca.idMarca inner join tipom on mantenimiento.idTipom = tipom.idtipom inner join doctor on mantenimiento.idDoctor = doctor.iddoctor ORDER BY idmantenimiento desc',function(err,rows)     {
 
        if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('mantenimiento/',{dataman:''});   
            } else {
                // render to views/user/index.ejs
                res.render('mantenimiento',{dataman:rows});
            }
    });
});

router.get('/listaEstado', function(req, res, next) {
      
    dbConn.query('SELECT * FROM mantenimiento inner join categoria on mantenimiento.idCategoria = categoria.idcategoria inner join hospital on mantenimiento.idHospital = hospital.idhospital inner join marca on mantenimiento.idMarca = marca.idMarca inner join tipom on mantenimiento.idTipom = tipom.idtipom inner join doctor on mantenimiento.idDoctor = doctor.iddoctor ORDER BY idmantenimiento desc',function(err,rows)     {
 
        if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('mantenimiento/listaEstado',{dataman:''});   
            } else {
                // render to views/user/index.ejs
                res.render('mantenimiento/listaEstado',{dataman:rows});
            }
    });
});

router.get('/listaEstadoDoctor', function(req, res, next) {
      
    dbConn.query('SELECT * FROM mantenimiento inner join categoria on mantenimiento.idCategoria = categoria.idcategoria inner join hospital on mantenimiento.idHospital = hospital.idhospital inner join marca on mantenimiento.idMarca = marca.idMarca inner join tipom on mantenimiento.idTipom = tipom.idtipom inner join doctor on mantenimiento.idDoctor = doctor.iddoctor ORDER BY idmantenimiento desc',function(err,rows)     {
 
        if(err) {
                req.flash('error', err);
                // render to views/user/index.ejs
                res.render('mantenimiento/listaEstadoDoctor',{dataman:''});   
            } else {
                // render to views/user/index.ejs
                res.render('mantenimiento/listaEstadoDoctor',{dataman:rows});
            }
    });
});
// display add hospital page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
         dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                            let TipoRows = rows;
                            dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                                if(err) {
                                    req.flash('error', err);
                                    res.render('mantenimiento/add', {
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        dataDoc: '',
                                        nombreman: '',
                                        idHospital: '',
                                        idMarca: '',
                                        idCategoria: '',
                                        idTipom: '',
                                        idDoctor: '',
                                        costo: '',
                                        fecha: '',
                                        numeroMan: '',
                                        noSerie: '',
                                        departamento: '',
                                    })  
                                } else {
                                        // render to views/user/index.ejs
                                    res.render('mantenimiento/add', {
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc :DoctorRows,
                                        nombreman: '',
                                        idHospital: '',
                                        idMarca: '',
                                        idCategoria: '',
                                        idTipom: '',
                                        idDoctor: '',
                                        costo: '',
                                        fecha: '',
                                        numeroMan: '',
                                        noSerie: '',
                                        departamento: '',
                                    })
                                }
                            })
                        })
                    })
                })
            })
})


// add a new hospital
router.post('/add', function(req, res, next) {    

    let nombreman = req.body.nombreman;
    let idHospital = req.body.idHospital;
    let idMarca = req.body.idMarca;
    let idCategoria = req.body.idCategoria;
    let idTipom = req.body.idTipom;
    let idDoctor = req.body.idDoctor;
    let costo = req.body.costo;
    let fecha = req.body.fecha;
    let numeroMan = req.body.numeroMan;
    let noSerie = req.body.noSerie;
    let departamento = req.body.departamento;
    let errors = false;

    if(nombreman.length === 0 || costo === 0 || fecha === 0 || noSerie === 0 || numeroMan === 0 || departamento === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                    dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                        let TipoRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            if(err) {
                                    req.flash('error', err);
                                    res.render('mantenimiento/add', {
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        dataDoc: '',
                                        nombreman: nombreman,
                                        idHospital: idHospital,
                                        idMarca: idMarca,
                                        idCategoria: idCategoria,
                                        idTipom: idTipom,
                                        idDoctor: idDoctor,
                                        costo: costo,
                                        fecha: fecha,
                                        numeroMan: numeroMan,
                                        noSerie: noSerie,
                                        departamento: departamento,
                                        })
                                    } else {
                                        // render to views/user/index.ejs
                                        res.render('mantenimiento/add', {
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        nombreman: nombreman,
                                        idHospital: idHospital,
                                        idMarca: idMarca,
                                        idCategoria: idCategoria,
                                        idTipom: idTipom,
                                        idDoctor: idDoctor,
                                        costo: costo,
                                        fecha: fecha,
                                        numeroMan: numeroMan,
                                        noSerie: noSerie,
                                        departamento: departamento,
                                    })
                                }

                        })
                    })
                })
            })
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            nombreman: nombreman,
            idHospital: idHospital,
            idMarca: idMarca,
            idCategoria: idCategoria,
            idTipom: idTipom,
            idDoctor: idDoctor,
            costo: costo,
            fecha: fecha,
            numeroMan: numeroMan,
            noSerie: noSerie,
            departamento: departamento,
            
        }
        
        // insert query
        dbConn.query('INSERT INTO mantenimiento SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                let HospitalRows = rows;
                dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                    let MarcaRows = rows;
                    dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                        let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                            let TipoRows = rows;
                            dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                                let DoctorRows = rows;
                                if(err) {
                                        req.flash('error', err);
                                        res.render('mantenimiento/add', {
                                            dataHos : '',
                                            dataMar : '',
                                            dataCat : '',
                                            dataTipo : '',
                                            dataHos : '',
                                            nombreman: form_data.nombreman,
                                            idHospital: form_data.idHospital,
                                            idMarca: form_data.idMarca,
                                            idCategoria: form_data.idCategoria,
                                            idTipom: form_data.idTipom,
                                            idDoctor: form_data.idDoctor,
                                            costo: form_data.costo,
                                            fecha: form_data.fecha,
                                            numeroMan: form_data.numeroMan,
                                            noSerie: form_data.noSerie,
                                            departamento: form_data.departamento,
                                        })
                                    } else {
                                        // render to views/user/index.ejs
                                        res.render('mantenimiento/add', {
                                            dataHos : HospitalRows,
                                            dataMar : MarcaRows,
                                            dataCat : CategoriaRows,
                                            dataTipo : TipoRows,
                                            nombreman: form_data.nombreman,
                                            idHospital: form_data.idHospital,
                                            idMarca: form_data.idMarca,
                                            idCategoria: form_data.idCategoria,
                                            idTipom: form_data.idTipom,
                                            idDoctor: form_data.idDoctor,
                                            costo: form_data.costo,
                                            fecha: form_data.fecha,
                                            numeroMan: form_data.numeroMan,
                                            noSerie: form_data.noSerie,
                                            departamento: form_data.departamento,
                                        })
                                    }   
                            })   
                        })
                    })
                })
            })
            } else {                
                req.flash('success', 'Mantenimeinto successfully added');
                res.redirect('/mantenimiento');
            }
        })
    }
})

// display edit user page
router.get('/edit/(:idmantenimiento)', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
   
    dbConn.query('SELECT * FROM mantenimiento WHERE idmantenimiento = ' + idmantenimiento, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'User not found with idmantenimiento = ' + idmantenimiento)
            res.redirect('/mantenimiento')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
             dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                            let TipoRows = rows;
                            dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                                let DoctorRows = rows;
                                if(err) {
                                    req.flash('error', err);
                                    res.render('mantenimiento/edit', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        dataDoc : '',
                                        idmantenimiento: varRows.idmantenimiento,
                                        nombreman: varRows.nombreman,
                                        idHospital: varRows.idHospital,
                                        idMarca: varRows.idMarca,
                                        idCategoria: varRows.idCategoria,
                                        idTipom: varRows.idTipom,
                                        idDoctor: varRows.idDoctor,
                                        costo: varRows.costo,
                                        fecha: varRows.fecha,
                                        numeroMan: varRows.numeroMan,
                                        noSerie: varRows.noSerie,
                                        departamento: varRows.departamento,
                                    })  
                                } else {
                                        // render to views/user/index.ejs
                                        res.render('mantenimiento/edit', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: varRows.idmantenimiento,
                                        nombreman: varRows.nombreman,
                                        idHospital: varRows.idHospital,
                                        idMarca: varRows.idMarca,
                                        idCategoria: varRows.idCategoria,
                                        idTipom: varRows.idTipom,
                                        idDoctor: varRows.idDoctor,
                                        costo: varRows.costo,
                                        fecha: varRows.fecha,
                                        numeroMan: varRows.numeroMan,
                                        noSerie: varRows.noSerie,
                                        departamento: varRows.departamento,
                                    })
                                }
                            })
                        })
                    })
                })
            })
        }
    })
})

// update user data
router.post('/update/:idmantenimiento', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
    let nombreman = req.body.nombreman;
    let idHospital = req.body.idHospital;
    let idMarca = req.body.idMarca;
    let idCategoria = req.body.idCategoria;
    let idTipom = req.body.idTipom;
    let idDoctor = req.body.idDoctor;
    let costo = req.body.costo;
    let fecha = req.body.fecha;
    let numeroMan = req.body.numeroMan;
    let noSerie = req.body.noSerie;
    let departamento = req.body.departamento;
    let errors = false;

    if(nombreman.length === 0 || costo === 0 || fecha === 0 || noSerie === 0 || numeroMan === 0 || departamento === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Recuerde llenar todos los campos requeridos!!!");
        // render to add.ejs with flash message
        dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                    dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                        let TipoRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            if(err) {
                                req.flash('error', err);
                                res.render('mantenimiento/edit', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        idmantenimiento: req.params.idmantenimiento,
                                        nombreman: nombreman,
                                        idHospital: idHospital,
                                        idMarca: idMarca,
                                        idCategoria: idCategoria,
                                        idTipom: idTipom,
                                        idDoctor: idDoctor,
                                        costo: costo,
                                        fecha: fecha,
                                        numeroMan: numeroMan,
                                        noSerie: noSerie,
                                        departamento: departamento,
                                })
                            } else {
                                // render to views/user/index.ejs
                                res.render('mantenimiento/edit', {
                                    title: 'Edit Man',
                                    dataHos : HospitalRows,
                                    dataMar : MarcaRows,
                                    dataCat : CategoriaRows,
                                    dataTipo : TipoRows,
                                    idmantenimiento: req.params.idmantenimiento,
                                    nombreman: nombreman,
                                    idHospital: idHospital,
                                    idMarca: idMarca,
                                    idCategoria: idCategoria,
                                    idTipom: idTipom,
                                    idDoctor: idDoctor,
                                    costo: costo,
                                    fecha: fecha,
                                    numeroMan: numeroMan,
                                    noSerie: noSerie,
                                    departamento: departamento,
                                })
                            }
                        })
                    })
                })
            })
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
            nombreman: nombreman,
            idHospital: idHospital,
            idMarca: idMarca,
            idCategoria: idCategoria,
            idTipom: idTipom,
            idDoctor: idDoctor,
            costo: costo,
            fecha: fecha,
            numeroMan: numeroMan,
            noSerie: noSerie,
            departamento: departamento,
        }
        // update query
        dbConn.query('UPDATE mantenimiento SET ? WHERE idmantenimiento = ' + idmantenimiento, form_data, function(err, result) {
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                let HospitalRows = rows;
                dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                    let MarcaRows = rows;
                    dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                        let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                                let TipoRows = rows;
                                if(err) {
                                        req.flash('error', err);
                                        res.render('mantenimiento/edit', {
                                            title: 'Edit Man',
                                            dataMar : '',
                                            dataCat : '',
                                            dataTipo : '',
                                            dataHos : '',
                                            dataDoc: '',
                                            idmantenimiento: req.params.idmantenimiento,
                                            nombreman: form_data.nombreman,
                                            idHospital: form_data.idHospital,
                                            idMarca: form_data.idMarca,
                                            idCategoria: form_data.idCategoria,
                                            idTipom: form_data.idTipom,
                                            idDoctor: form_data.idDoctor,
                                            costo: form_data.costo,
                                            fecha: form_data.fecha,
                                            numeroMan: form_data.numeroMan,
                                            noSerie: form_data.noSerie,
                                            departamento: form_data.departamento,
                                            })
                                } else {
                                    // render to views/user/index.ejs
                                    res.render('mantenimiento/edit', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: req.params.idmantenimiento,
                                        nombreman: form_data.nombreman,
                                        idHospital: form_data.idHospital,
                                        idMarca: form_data.idMarca,
                                        idCategoria: form_data.idCategoria,
                                        idTipom: form_data.idTipom,
                                        idDoctor: form_data.idDoctor,
                                        costo: form_data.costo,
                                        fecha: form_data.fecha,
                                        numeroMan: form_data.numeroMan,
                                        noSerie: form_data.noSerie,
                                        departamento: form_data.departamento,
                                    })
                                }
                            })
                        })
                    })
                })
            })
            } else {
                req.flash('success', 'Mantenimeinto successfully updated');
                res.redirect('/mantenimiento');
            }
        })
            
    }
})

//Estado Gerente

router.get('/estadoGerente/(:idmantenimiento)', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
   
    dbConn.query('SELECT * FROM mantenimiento WHERE idmantenimiento = ' + idmantenimiento, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Mantenimiento not found with idmantenimiento = ' + idmantenimiento)
            res.redirect('/mantenimiento')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
             dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                            let TipoRows = rows;
                            dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                                let DoctorRows = rows;
                                if(err) {
                                    req.flash('error', err);
                                    res.render('mantenimiento/estadoGerente', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        dataDoc : '',
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoG : varRows.estadoG,
                                    })  
                                } else {
                                        // render to views/user/index.ejs
                                        res.render('mantenimiento/estadoGerente', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoG : varRows.estadoG,
                                    })
                                }
                            })
                        })
                    })
                })
            })
        }
    })
})

// update user data
router.post('/estadoGerente/:idmantenimiento', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
    let estadoG = req.body.estadoG;
    let errors = false;
    dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                    dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                        let TipoRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            if(err) {
                                req.flash('error', err);
                                res.render('mantenimiento/estadoGerente', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoG: estadoG,
                                })
                            } else {
                                // render to views/user/index.ejs
                                res.render('mantenimiento/estadoGerente', {
                                    title: 'Edit Man',
                                    dataHos : HospitalRows,
                                    dataMar : MarcaRows,
                                    dataCat : CategoriaRows,
                                    dataTipo : TipoRows,
                                    idmantenimiento: req.params.idmantenimiento,
                                    estadoG: estadoG,
                                })
                            }
                        })
                    })
                })
            })
        })

    // if no error
    if( !errors ) {   
 
        var form_data = {
            estadoG: estadoG,
        }
        // update query
        dbConn.query('UPDATE mantenimiento SET ? WHERE idmantenimiento = ' + idmantenimiento, form_data, function(err, result) {
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                let HospitalRows = rows;
                dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                    let MarcaRows = rows;
                    dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                        let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                                let TipoRows = rows;
                                if(err) {
                                        req.flash('error', err);
                                        res.render('mantenimiento/estadoGerente', {
                                            title: 'Edit Man',
                                            dataMar : '',
                                            dataCat : '',
                                            dataTipo : '',
                                            dataHos : '',
                                            dataDoc: '',
                                            idmantenimiento: req.params.idmantenimiento,
                                            estadoG: form_data.estadoG,
                                            })
                                } else {
                                    // render to views/user/index.ejs
                                    res.render('mantenimiento/estadoGerente', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoG: form_data.estadoG,
                                    })
                                }
                            })
                        })
                    })
                })
            })
            } else {
                req.flash('success', 'Mantenimeinto successfully updated');
                res.redirect('/mantenimiento/listaEstado');
            }
        })
            
    }
})

router.get('/estadoDoctor/(:idmantenimiento)', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
   
    dbConn.query('SELECT * FROM mantenimiento WHERE idmantenimiento = ' + idmantenimiento, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Mantenimiento not found with idmantenimiento = ' + idmantenimiento)
            res.redirect('/mantenimiento')
        }
        // if user found
        else {
            // render to edit.ejs
            let varRows = rows[0];
             dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                            let TipoRows = rows;
                            dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                                let DoctorRows = rows;
                                if(err) {
                                    req.flash('error', err);
                                    res.render('mantenimiento/estadoDoctor', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        dataDoc : '',
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoD : varRows.estadoD,
                                    })  
                                } else {
                                        // render to views/user/index.ejs
                                        res.render('mantenimiento/estadoDoctor', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoD : varRows.estadoD,
                                    })
                                }
                            })
                        })
                    })
                })
            })
        }
    })
})

// update user data
router.post('/estadoDoctor/:idmantenimiento', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
    let estadoD = req.body.estadoD;
    let errors = false;
    dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
             let HospitalRows = rows;
            dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                let MarcaRows = rows;
                dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                    let CategoriaRows = rows;
                    dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                        let TipoRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            if(err) {
                                req.flash('error', err);
                                res.render('mantenimiento/estadoDoctor', {
                                        title: 'Edit Man',
                                        dataMar : '',
                                        dataCat : '',
                                        dataTipo : '',
                                        dataHos : '',
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoD: estadoD,
                                })
                            } else {
                                // render to views/user/index.ejs
                                res.render('mantenimiento/estadoDoctor', {
                                    title: 'Edit Man',
                                    dataHos : HospitalRows,
                                    dataMar : MarcaRows,
                                    dataCat : CategoriaRows,
                                    dataTipo : TipoRows,
                                    idmantenimiento: req.params.idmantenimiento,
                                    estadoD: estadoD,
                                })
                            }
                        })
                    })
                })
            })
        })

    // if no error
    if( !errors ) {   
 
        var form_data = {
            estadoD: estadoD,
        }
        // update query
        dbConn.query('UPDATE mantenimiento SET ? WHERE idmantenimiento = ' + idmantenimiento, form_data, function(err, result) {
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                dbConn.query('SELECT * FROM hospital ORDER BY idhospital desc',function(err,rows){
                let HospitalRows = rows;
                dbConn.query('SELECT * FROM marca ORDER BY idmarca desc',function(err,rows){
                    let MarcaRows = rows;
                    dbConn.query('SELECT * FROM categoria ORDER BY idcategoria desc',function(err,rows){
                        let CategoriaRows = rows;
                        dbConn.query('SELECT * FROM doctor ORDER BY iddoctor desc',function(err,rows){
                            let DoctorRows = rows;
                            dbConn.query('SELECT * FROM tipom ORDER BY idtipom desc',function(err,rows){
                                let TipoRows = rows;
                                if(err) {
                                        req.flash('error', err);
                                        res.render('mantenimiento/estadoDoctor', {
                                            title: 'Edit Man',
                                            dataMar : '',
                                            dataCat : '',
                                            dataTipo : '',
                                            dataHos : '',
                                            dataDoc: '',
                                            idmantenimiento: req.params.idmantenimiento,
                                            estadoD: form_data.estadoD,
                                            })
                                } else {
                                    // render to views/user/index.ejs
                                    res.render('mantenimiento/estadoDoctor', {
                                        title: 'Edit Man',
                                        dataHos : HospitalRows,
                                        dataMar : MarcaRows,
                                        dataCat : CategoriaRows,
                                        dataTipo : TipoRows,
                                        dataDoc : DoctorRows,
                                        idmantenimiento: req.params.idmantenimiento,
                                        estadoD: form_data.estadoD,
                                    })
                                }
                            })
                        })
                    })
                })
            })
            } else {
                req.flash('success', 'Mantenimeinto successfully updated');
                res.redirect('/mantenimiento/listaEstadoDoctor');
            }
        })
            
    }
})

// delete user
/*router.get('/delete/(:idmantenimiento)', function(req, res, next) {

    let idmantenimiento = req.params.idmantenimiento;
     
    dbConn.query('DELETE FROM mantenimiento WHERE idmantenimiento= ' + idmantenimiento, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to user page
            res.redirect('/mantenimiento')
        } else {
            // set flash message
            req.flash('success', 'Mantenimeinto successfully deleted! idmantenimiento = ' + idmantenimiento)
            // redirect to user page
            res.redirect('/mantenimiento')
        }
    })
})*/

module.exports = router;

