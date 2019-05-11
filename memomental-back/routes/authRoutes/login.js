//module that handle authentification with JWT


module.exports = function(){
    console.log("arrivée dans auth");
    var jwt = require('jsonwebtoken');
    var auth = {
        authenticate: function(req, res) {
            var username;
            var passwd;
            console.log(req.body);
            if(req.body.username == undefined && req.body.passwd == undefined) {
                console.log("aucun message reçu");
                //if data is empty we return 401 status
                return res.json({
                    "status": 401,
                    "message": "Aucune donnée reçue"
                });
            }
            else
            {
                console.log("message reçu");
                //we create user object
                var user = {
                    "name" : "name",
                    "firstname" : "firstname"
                };
                //we return JWT

                var token = jwt.sign(user,process.env.hashkey , {
                    expiresIn : "1d",
                });
                console.log(token);
                //return satuts OK with token
                return res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token
                });
            }
        }
        }
        return auth;
}
