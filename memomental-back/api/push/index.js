
 module.exports = async(req,res) =>{
    console.log('/push OK')
     const express = require('express');
     const router = express.Router();
     router.post("/register",require('./register'));
    /*
    router.delete("/unregister", (req, res, next) => {
        subscription = null
        clearInterval(pushIntervalID)
        res.sendStatus(200)
    })*/
    return router;
}

