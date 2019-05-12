module.exports = async (req,res) => {
 try {
     const jwt = require('jsonwebtoken');

     console.log("is auth");
     let bearerToken;
     console.log(req.headers);
     const bearerHeader = req.headers["authorization"];
     if (typeof bearerHeader !== 'undefined') {
         const bearer = bearerHeader.split(" ");
         bearerToken = bearer[1];
         console.log(bearerToken);
         jwt.verify(bearerToken, process.env.tokenKey, function (err) {
             if (err) {
                 console.log("Impossible d'accéder à cette page protégée 12");
                 res.sendStatus(403);
                 return false;
             } else {
                 console.log("is connected");
                 return true;
             }
         });
     }
     else
     {
         console.log("Aucun token ");
         res.sendStatus(403);
     }
 } catch(error){
     console.log("try / catch ");
     res.sendStatus(403);
 }


}


