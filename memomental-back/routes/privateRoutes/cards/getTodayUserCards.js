const LearningController = require('../../../api/controllers/LearningController');
const CardController = require('../../../api/controllers/CardController');
const decodeToken = require('../../../api/encryption/decodeToken');
const moment = require('moment');

module.exports = async (req, res) => {
    try {
        console.log('arrivé dans la recherche de learnings  ');
        const decoded= await decodeToken(req);
        console.log("decoded token ",decoded);
        console.log(moment().format("DD/MM/YYYY"));
        const todayCards = await LearningController.getTodayLearnings(decoded.id);
        const returnCards = todayCards.map(function(object){
            return {
                _id : object.card._id,
                name : object.card.name,
                question : object.recto?object.card.rectoQuestion:object.card.versoQuestion,
                labels : object.card.labels
            }
        })
        console.log(returnCards);
        return res.status(200).json(returnCards);
    }catch(error) {
        console.log("impossible de récupérer les cartes ",error)
        res.status(500).json(error.message);
    }
}

