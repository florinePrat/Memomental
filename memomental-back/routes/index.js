//handle all non private routes


module.exports= function(){
     const express = require('express');
     const router = express.Router();

     const login = require('./authRoutes/login.js')();
     router.post('/login',require('./authRoutes/login.js').authenticate());
     router.post('/register', require('./authRoutes/register'));
     router.use('/card', require("./privateRoutes/cards"));
    return router;
};
