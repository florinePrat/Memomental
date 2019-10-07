const CardController = require('../../../api/controllers/CardController');
const decodeToken = require('../../../api/encryption/decodeToken');

module.exports = async (req, res) => {
    try {
        const decoded= await decodeToken(req);
        const labelId = req.query.labelId;
        console.log("rewuete arrivée");
        console.log(labelId);
        const cards = await CardController.getCardsByUserLabels(decoded.id,labelId);
        console.log("cards",cards[0].labels);
            return res.status(200).json(cards)
    }catch(error) {
        console.log("impossible de récupérer les cartes associées à ce label ",error);
        res.status(error.code).json(error.message);
    }
};

