var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
var authController = require('../controllers/auth')

router.post('/login', authController.login); 

router.get('/login' , function(req, res, next) {
    res.redirect('user/login')
})

router.get('/logout', function(req, res, next) {
      req.session.destroy();
      res.redirect('user/login');
});



module.exports = router;

 