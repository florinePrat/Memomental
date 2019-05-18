const UserController = require("../controllers/UserController");
const decodeToken = require('../encryption/decodeToken');
const sendPush= require('./sendPush');

module.exports = async (req,res) =>{
    try{
        console.log(req.body)
        const decoded = await decodeToken(req);
        await  UserController.addPushKey(decoded.id,req.body);
        sendPush.sendNotification(req.body);
        return res.status(200).json({success})
    } catch(error){
        return res.status(500).json("erreur lors de la push");
    }

};
