/*
Card Controller handle all action with card database object : getting card by it's id and adding a new card
 */

const Card = require('../models/Card');

const LabelController = require('./LabelController');

const getCardById = async (id) => {
    try {
        const card = await Card.findById(id);
        return card;
    } catch (error) {
        console.log("Impossible de trouver la carte demandée ");
        return error;
    }
}
const createCard = async (name, rectoQuestion, rectoAnswer, versoQuestion, versoAnswer,userId,labelId) => {
    try {
        console.log(name);
        const card = new Card({
            name: name,
            rectoQuestion: rectoQuestion,
            rectoAnswer: rectoAnswer,
            versoQuestion: versoQuestion,
            versoAnswer : versoAnswer,
            owners : [userId],
            labels : [labelId]
        });
        console.log('carte cree');
        const savedCard= await card.save()
        return savedCard
    } catch (error) {
        console.log(error.message)
        return error;
    }
}
const getCardsByUser = async(idUser) =>
{
    try {
        //searching all cards by user
        const cards = await Card.find({ owners : idUser});
        // @TODO : find solution to avoid n2 research
        let labels;

        cards.forEach(function(card)
        {
            console.log("avant get",card.labels)
            //for each cards
            labels = [];
            card.labels.forEach(async function(label)
            {
                //for each label in the card, we search label name and push into an array
                const newLabel = await LabelController.getLabelById(label);
                console.log(newLabel.name)
                labels.push(newLabel.name )
                console.log("après push",labels);
            });
            console.log("labels après push hors each",labels)
            //we replace labels id array by labels names array
            card.labels = labels;
            console.log("après get",card.labels);
        });
        console.log(cards);
        return cards;
    } catch(error)
    {
        console.log(error.message)
        return error;
    }
}

module.exports = {
    getCardById,
    createCard,
    getCardsByUser,
};
