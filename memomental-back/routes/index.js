//handle all non private routes


module.exports= function(){
     const express = require('express');
     const router = express.Router();

     const login = require('./authRoutes/login.js')();
     router.post('/login', login.authenticate);
     router.post('/register', require('./authRoutes/register'));
     router.post('/isAuth', require('../middlewares/isAuth'));
     router.use('/card',
          require("./privateRoutes/cards")
     );
    return router;
};
