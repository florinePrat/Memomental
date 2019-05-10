//handle all routes


module.exports= function(){
     var express = require('express');
     var router = express.Router();
     var auth = require('./auth.js')();
    router.post('/login', auth.authenticate);

    return router;
};
