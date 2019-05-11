//handle all  privates routes


module.exports= function() {
    const express = require('express');
    const router = express.Router();
    const isAuth = require('../middlewares/isAuth');

     router.post('/*', isAuth)
    router.put('/*', isAuth)
    router.delete('/*', isAuth)
    router.get('/*', isAuth )

    router.use('/card/', function(req,res) {
        console.log("next 2 ");
        require("./cards");
})
}
