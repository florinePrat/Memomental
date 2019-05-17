const UserController = require('../../api/controllers/UserController');
const jwt = require('jsonwebtoken');

const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

module.exports = async (req, res) => {
    try {
        const { email, firstName, password} = req.body;
        if (!email){
            return res.status(400).json({error : "Aucun email saisi"});
        }else if (!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        }else if (!firstName){
            return res.status(400).json({error : "Aucun prénom saisi"});
        }else if (!password){
            return res.status(400).json({error : "Aucun mot de passe saisi"});
        }else if (UserController.getUserByEmail(email)){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        else{
            /* @TODO : check data validity with regExp + trim */
            //creation of user in database
            const user = await UserController.createUser(email.toLowerCase(),firstName, password);
            //if success token creation of 1day
            const tokenUser = {
                id : user._id,
                email: user.email,
                firstName: user.firstName
            };
            const token = jwt.sign(tokenUser,process.env.tokenKey , {
                expiresIn : "1d",
            });
            //return status OK with token
            return res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                firstName: user.firstName
            });
        }

    }catch (e) {

        return {
            error : "Impossible de créer l'utilisateur"
        } ;
    }
    };
