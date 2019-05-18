const UserController = require("../controllers/UserController");
const decodeToken = require('../encryption/decodeToken');

module.exports = async (req,res) =>{
    try{
        console.log("body",req.body)
        const decoded = await decodeToken(req);
        await  UserController.addPushKey(decoded.id,req.body);
        console.log('user ok');
        return res.status(200).json({ response : "success"})
    } catch(error){
        return res.status(500).json("erreur lors de la push");
    }

};
