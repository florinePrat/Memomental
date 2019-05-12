const CardController = require('../../../api/controllers/CardController');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        console.log('arrivé dans la recherche de cartes ');
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jwt.decode(token);
        const cards = await CardController.getCardsByUser(decoded.id);
        return res.status(200).json(cards)
    }catch(error) {
        console.log("impossible de récupérer les cartes ")
        res.status(error.code).json(error.message);
    }
}

