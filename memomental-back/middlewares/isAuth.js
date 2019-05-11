module.exports = function() {

    const jwt = require('jsonwebtoken');
    return function (req, res, next) {
        console.log("is auth");
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            let decode = jwt.verify(req.token, process.env.hashkey, function (err) {
                if (err) {
                    console.log("Impossible d'accéder à cette page protégée");
                    res.sendStatus(403);
                } else {
                    return true;
                    console.log("is connected");
                }
            });
        }
    };
}


