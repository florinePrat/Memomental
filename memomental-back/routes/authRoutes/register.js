const UserController = require('../../api/controllers/UserController')
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        console.log("arrivée dans la registration");
        const { email, firstName, lastName, password} = req.body;
        console.log(req.body);
        /* @TODO : check data validity with regExp + trim */
        //creation of user in database
        const user = await UserController.createUser(email,firstName, lastName, password)
        //if success token creation of 1day
        console.log('user created"');
        var token = jwt.sign(user.toJSON(),process.env.hashkey , {
            expiresIn : "1d",
        });
        console.log(token);
        //return status OK with token
        return res.status(200).json({
            success: true,
            message: 'Connected !',
            token: token,
            user : user.toJSON()
        });
        return res.status(201).json(user)
    }catch (e) {
        console.log("utilisateur non créé :",e);
        return e ;
    }

    }
