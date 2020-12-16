var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');


dotenv.config({path : './env'})

var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection  = require('./lib/db');

// define routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var hospitalRouter = require('./routes/hospital');
var marcaRouter = require('./routes/marca');
var tipomRouter = require('./routes/tipom');
var categoriaRouter = require('./routes/categoria');
var cargosRouter = require('./routes/cargos');
var mantenimientoRouter = require('./routes/mantenimiento');
var asignacionRouter = require('./routes/asignacion');
var doctorARouter = require('./routes/doctorA');
var diagnosticoRouter = require('./routes/diagnostico');
var comentarioRouter = require('./routes/comentario');
var calificacionRouter = require('./routes/calificacion');
var comparacionRouter = require('./routes/comparacion');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// Data comes in json
app.use(express.json());
// Grab the data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/hospital', hospitalRouter);
app.use('/marca', marcaRouter);
app.use('/tipom', tipomRouter);
app.use('/categoria', categoriaRouter);
app.use('/cargos', cargosRouter);
app.use('/mantenimiento', mantenimientoRouter);
app.use('/asignacion', asignacionRouter);
app.use('/doctorA', doctorARouter);
app.use('/diagnostico', diagnosticoRouter);
app.use('/comentario', comentarioRouter);
app.use('/calificacion', calificacionRouter);
app.use('/comparacion', comparacionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
