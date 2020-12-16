var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');


router.get('/seleccionarTecnicos', function(req, res, next) {
    dbConn.query('SELECT distinct tecnico, usuario FROM calificacion inner join usuario on tecnico = idusuario order by usuario desc', function(err, rows, fields) {
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('comparacion/seleccionarTecnicos',{
                dataAs:'',
                tecnico: '',
                categoria: ''
            });   
        } else {
            // render to views/user/index.ejs
            res.render('comparacion/seleccionarTecnicos',{
                dataAs:rows,
                tecnico: '',
                categoria: ''
            });
        }
    });
})

router.post('/comparar', function(req, res, next) {
    let categoria = req.body.categoria;
    let tecnico = req.body.tecnico;
    let calificacion ;
    let usuario;
    let matriz = [];
    for(let i = 0; i < tecnico.length; i++) {
        if(categoria ==='presentacion'){
            dbConn.query('SELECT SUM(presentacion) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        } else if (categoria ==='conocimiento'){
            dbConn.query('SELECT SUM(conocimiento) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        }else if(categoria ==='puntualidad'){
            dbConn.query('SELECT SUM(puntualidad) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        } else if (categoria ==='comunicacion'){
            dbConn.query('SELECT SUM(comunicacion) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico =  ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        }else if(categoria ==='amabilidad'){
            dbConn.query('SELECT SUM(amabilidad) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        }else if(categoria ==='calificacionTotal'){
            dbConn.query('SELECT SUM(calificacionTotal) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico =  ' + tecnico[i], function(err, rows, fields){
                if(err){
                    calificacion = 0;
                }else{
                    calificacion = rows[0].calificacion;
                    usuario = rows[0].usuario;
                    matriz.push([usuario, calificacion]);
                    if ( i === tecnico.length - 1){
                        matriz = matriz.sort(function(a, b) {
                            return b[1] - a[1];
                        });
                        res.render('comparacion/resultados',{
                            categoria : categoria,
                            matriz : matriz,
                        });
                    }
                }
            });
        }else{
            res.redirect('/seleccionarTecnicos');
        }
    }
    req.flash('success', 'comparacion relizada');
})

/*router.get('/categoria', function(req, res, next) {
    res.render('comparacion/categoria',{
        categoria: ''
    });;
})
router.post('/categoriaC', function(req, res, next) {
    dbConn.query('SELECT distinct tecnico AS tecnico, usuario FROM calificacion inner join usuario on tecnico = idusuario order by usuario desc', function(err, rows, fields) {
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('comparacion/categoria',{
                categoria: ''
            });   
        } else {
            // render to views/user/index.ejs
            let categoria = req.body.categoria;
            console.log(categoria);
            let rep = rows.length;
            let tecnico;
            let calificacion;
            let calificacionT;
            let usuario;
            let matrizC = [];
            for(let i = 0; i < rep ; i++) {
                tecnico = rows[i].tecnico;
                console.log(tecnico);
                if(categoria ==='presentacion'){
                    dbConn.query('SELECT SUM(presentacion) AS calificacion, SUM(calificacionTotal) AS calificacionT , usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico, function(err, rows, fields){
                        if(err){
                            calificacion = 0;
                            console.log('testFail');
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            calificacionT = rows[0].calificacionT;
                            usuario = rows[0].usuario;
                            matrizC.push([usuario, calificacion , calificacionT]);
                            console.log(matrizC);
                            if ( i === rep - 1){
                                matrizC = matrizC.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadosC',{
                                    categoria : categoria,
                                    matrizC : matrizC,
                                });
                            }
                        }
                    });
                }
            }
        }
    });
})*/

/*router.get('/categoria', function(req, res, next) {
    dbConn.query('SELECT distinct tecnico AS tecnico, usuario FROM calificacion inner join usuario on tecnico = idusuario order by usuario desc', function(err, rows, fields) {
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('comparacion/categoria',{
                dataAs : '',
                categoria: '',
                matrizT : '',
            });   
        } else {
            // render to views/user/index.ejs
            let rep = rows.length;
            let tecnico;
            let cp , cc , pu , cco , ca , ct ;
            let usuario;
            let matrizT = [];
            for(let i = 0; i < rep ; i++) {
                tecnico = rows[i].tecnico;
                console.log(tecnico);
                dbConn.query('SELECT SUM(presentacion) AS cp, SUM(calificacionTotal) AS ct , SUM(conocimiento) AS cc , SUM(comunicacion) AS cco , SUM(amabilidad) AS ca , SUM(puntualidad) pu, usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico, function(err, rows, fields){
                    if(err){
                        cp = 0;
                        console.log('testFail');
                    }else{
                        console.log('testPass');
                        cp = rows[0].cp;
                        ct = rows[0].ct;
                        cc = rows[0].cc;
                        pu = rows[0].pu;
                        ca = rows[0].ca;
                        cco = rows[0].cco;
                        usuario = rows[0].usuario;
                        matrizT.push([usuario, cp , cc, pu, ca, cco, ct]);
                        console.log(matrizT);
                        if ( i === rep - 1){
                            matrizT = matrizT.sort(function(a, b) {
                                return b[6] - a[6];
                            });
                            res.render('comparacion/categoria',{
                                categoria : '',
                                matrizT : matrizT,
                            });
                        }
                    }
                });
            }
        }
    });
})

router.post('/compararC', function(req, res, next) {
    dbConn.query('SELECT distinct tecnico AS tecnico, usuario FROM calificacion inner join usuario on tecnico = idusuario order by usuario desc', function(err, rows, fields) {
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('comparacion/categoria',{
                dataAs : '',
                categoria: '',
                matrizT : '',
            });   
        } else {
            // render to views/user/index.ejs
            let rep = rows.length;
            let categoria = req.body.categoria;
            let tecnico;
            let cp , cc , pu , cco , ca , ct ;
            let usuario;
            let matrizT = [];
            for(let i = 0; i < rep ; i++) {
                tecnico = rows[i].tecnico;
                console.log(tecnico);
                if(categoria ==='presentacion'){
                    dbConn.query('SELECT SUM(presentacion) AS cp, SUM(calificacionTotal) AS ct , SUM(conocimiento) AS cc , SUM(comunicacion) AS cco , SUM(amabilidad) AS ca , SUM(puntualidad) pu, usuario  FROM calificacion inner join usuario on tecnico = idusuario WHERE tecnico = ' + tecnico, function(err, rows, fields){
                    if(err){
                        cp = 0;
                        console.log('testFail');
                    }else{
                        console.log('testPass');
                        cp = rows[0].cp;
                        ct = rows[0].ct;
                        cc = rows[0].cc;
                        pu = rows[0].pu;
                        ca = rows[0].ca;
                        cco = rows[0].cco;
                        usuario = rows[0].usuario;
                        matrizT.push([usuario, cp , cc, pu, ca, cco, ct]);
                        console.log(matrizT);
                        if ( i === rep - 1){
                            matrizT = matrizT.sort(function(a, b) {
                                return b[1] - a[1];
                            });
                            res.render('comparacion/compararC',{
                                categoria : categoria,
                                matrizT : matrizT,
                            });
                        }
                    }
                    });
                }

                
            }
        }
    });
})*/

router.get('/rango', function(req, res, next) {
    res.render('comparacion/rango',{
        categoria: '',
        maximo: '',
        minimo: ''
    });;
})

router.post('/resultadorango', function(req, res, next) {
    dbConn.query('SELECT distinct tecnico AS tecnico, usuario FROM calificacion inner join usuario on tecnico = idusuario order by usuario desc', function(err, rows, fields) {
        if(err) {
            req.flash('error', err);
            // render to views/user/index.ejs
            res.render('comparacion/rango',{
                categoria: '',
                maximo: '',
                minimo: ''
            });   
        } else {
            // render to views/user/index.ejs
            let categoria = req.body.categoria;
            let maximo = req.body.maximo;
            let minimo = req.body.minimo;
            console.log(categoria);
            console.log(maximo);
            console.log(minimo);
            let rep = rows.length;
            let tecnico;
            let calificacion;
            let usuario;
            let matrizR = [];
            for(let i = 0; i < rep ; i++) {
                tecnico = rows[i].tecnico;
                console.log(tecnico);
                if(categoria ==='presentacion'){
                    dbConn.query('SELECT SUM(presentacion) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                } else if(categoria ==='conocimiento'){
                    dbConn.query('SELECT SUM(conocimiento) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                } else if(categoria ==='puntualidad'){
                    dbConn.query('SELECT SUM(puntualidad) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                } else if(categoria ==='comunicacion'){
                    dbConn.query('SELECT SUM(comunicacion) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                } else if(categoria ==='amabilidad'){
                    dbConn.query('SELECT SUM(amabilidad) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                } else if(categoria ==='calificacionTotal'){
                    dbConn.query('SELECT SUM(calificacionTotal) AS calificacion , usuario  FROM calificacion inner join usuario on tecnico = idusuario where tecnico =  ' + tecnico, function(err, rows, fields){
                        if(err){
                            console.log('testFail');
                            calificacion = 0;
                        }else{
                            console.log('testPass');
                            calificacion = rows[0].calificacion;
                            console.log(calificacion);
                            usuario = rows[0].usuario;
                            if(calificacion >= minimo){
                                if (calificacion <= maximo){
                                    matrizR.push([usuario, calificacion]);
                                };
                            };
                            console.log(matrizR);
                            if ( i === rep - 1){
                                matrizR = matrizR.sort(function(a, b) {
                                    return b[1] - a[1];
                                });
                                res.render('comparacion/resultadorango',{
                                    categoria : categoria,
                                    matrizR : matrizR,
                                });
                            }
                        }
                    });
                }
                
            }
        }
    });
})






module.exports = router;