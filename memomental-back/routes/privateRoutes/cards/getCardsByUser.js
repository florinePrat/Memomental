const CardController = require('../../../api/controllers/CardController');
const decodeToken = require('../../../api/encryption/decodeToken');

module.exports = async (req, res) => {
    try {
        const decoded= await decodeToken(req);
        const cards = await CardController.getCardsByUser(decoded.id);
        return res.status(200).json(cards)
    }catch(error) {
        console.log("impossible de récupérer les cartes ")
        res.status(error.code).json(error.message);
    }
}

