//module that handle authentification with JWT

const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = async (req,res)=> {
    try {
        const jwt = require('jsonwebtoken');
        const UserController = require('../../api/controllers/UserController');
        if(req.body.email === undefined) {
            //if data is empty we return 400 status
            return res.status(400).json({error : "Aucun email saisi"});
        }else if(req.body.password === undefined){
            return res.status(400).json({error : "Aucun mot de passe saisi"});
        }else if(!req.body.email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        } else{
            const email = req.body.email.toLowerCase();
            const password = req.body.password;
            //gettinf user by his email
            const user = await UserController.getUserByEmail(email);
            const bcrypt = require('bcrypt');
            //comparing encrypted password of user
            const match = await  bcrypt.compare(password,user.password.toString());
            if(match){
                //if password compare is true, we return token
                const tokenUser = {
                    id : user._id,
                    email: user.email,
                    firstName: user.firstName,
                };
                const token = jwt.sign(tokenUser, process.env.tokenKey, {
                    expiresIn: "1d",
                });
                console.log(token);
                //return satuts OK with token
                return  res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    firstName: user.firstName,
                });
            }
            else{
                return  res.status(401).json({
                    error: 'mot de passe incorrect'
                });
            }
        }
    } catch(error) {
        return  res.status(401).json({
            error: "erreur lors de l'authentication"
        });
    }

    };
