//handle all non private routes


module.exports= function(){
     const express = require('express');
     const router = express.Router();


//Handle all non restricted routes (ie all authenticate routes)
     router.post('/login',require('./authRoutes/login'));
     router.post('/register', require('./authRoutes/register'));

//Handle all resricted routes
     router.use('/api/card', require("./privateRoutes/cards"));
     router.use('/api/user', require("./privateRoutes/users"));
//handle push subscription
     router.use('/api/push/register',require("../api/push/register"));
    return router;
};


