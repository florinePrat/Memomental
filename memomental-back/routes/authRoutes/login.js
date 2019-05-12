//module that handle authentification with JWT


module.exports = async (req,res)=> {
    try {
        console.log("arrivée dans auth");
        const jwt = require('jsonwebtoken');
        const UserController = require('../../api/controllers/UserController');
        console.log(req.body);
        if(req.body.email === undefined && req.body.password === undefined) {
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
            const email = req.body.email.toLowerCase();
            const password = req.body.password;
            //gettinf user by his email
            const user = await UserController.getUserByEmail(email);
            console.log(user);
            const bcrypt = require('bcrypt');
            console.log(password)
            //comparing encrypted password of user
            const match = await  bcrypt.compare(password,user.password.toString());
            if(match)
            {
                //if password compare is true, we return token
                const tokenUser =
                {
                    id : user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                console.log("connected with : ",tokenUser);
                const token = jwt.sign(tokenUser, process.env.tokenKey, {
                    expiresIn: "1d",
                });
                console.log(jwt.decode(token));
                console.log(token);
                //return satuts OK with token
                return  res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            }
            else
            {
                console.log("erreur lors de la connexion");
                return {
                    "status": 401,
                    "message": "Aucune donnée reçue"
                };
            }
        }
    } catch(error) {
        return res.json({
            "status": 401,
            "message": "Erreur lors de la connexion"
        });
    }

    }
