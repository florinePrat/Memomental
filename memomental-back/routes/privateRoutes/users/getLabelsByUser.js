const UserController = require('../../../api/controllers/UserController');
const decodeToken = require('../../../api/encryption/decodeToken');

module.exports = async (req, res) => {
    try {
        const decoded= await decodeToken(req);
        const lab = await UserController.getLabelsByUser(decoded.id);
        console.log("ahhhhhhhh"+lab);
        return res.status(200).json(lab)
    }catch(error) {
        console.log("impossible de récupérer le LABEL des cartes ")
        res.status(error.code).json(error.message);
    }
};

