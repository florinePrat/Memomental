module.exports = function() {

    const jwt = require('jsonwebtoken');
    return function (req, res, next) {
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            let decode = jwt.verify(req.token, process.env.hashkey, function (err, data) {
                if (err) {
                    console.log("Impossible d'accéder à cette page protégée");
                    res.sendStatus(403);
                } else {
                    res.json({
                        message : 'Connexion réussie',
                        data
                    });
                    console.log("connexion OK");
                }
            });
        }
    };
}


